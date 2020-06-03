import decodeJwt from 'jwt-decode';
import {isAdmin} from "./utils";

export const userAuthItems = [
    'token',
    'exp',
    'roles',
    'id',
];

export const userGeoentityItems = [
    'countries',
    'states',
    'areas'
];

export const localStorageItems = [...userAuthItems, ...userGeoentityItems];

export const localStorageSet = (data) => {
    localStorageItems.forEach(item => data[item] ? localStorage.setItem(item, data[item]) : null);
};
export const localStorageClear = () => {
    localStorageItems.forEach(item => localStorage.removeItem(item));
};


const login_uri = process.env.REACT_APP_API_HOST + '/authentication_token';
export const authProvider = {
    login: ({ username, password }) =>  {
        const request = new Request(login_uri, {
            method: 'POST',
            body: JSON.stringify({ email: username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token }) => {
                const decodedToken = decodeJwt(token);
                localStorageSet({
                    token,
                    ...decodedToken
                });
                const role = decodedToken.roles[0];
                const userId = decodedToken.id
                if(! isAdmin(role)) {
                    const user_fetch_uri = process.env.REACT_APP_API_HOST + '/api/users/' + userId;
                    const request = new Request(user_fetch_uri, {
                        method: 'GET',
                        headers: new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}),
                    });
                    return fetch(request).then(response => {
                        if (response.status < 200 || response.status >= 300) {
                            throw new Error(response.statusText);
                        }
                        return response.json();
                    }).then(({countries, states, areas}) => {
                        const values = {
                            countries: '',
                            states: '',
                            areas: ''
                        };
                        if (countries && Array.isArray(countries)) {
                            values.countries = countries.join(',')
                        }
                        if (states && Array.isArray(states)) {
                            values.states = states.join(',')
                        }
                        if (areas && Array.isArray(areas)) {
                            values.areas = areas.join(',')
                        }
                        localStorageSet(values);
                    })
                } else {
                    return Promise.resolve();
                }
            })
    },
    logout: () => {
        localStorageClear();
        return Promise.resolve();
    },
    checkAuth: () => localStorage.getItem('token') ? Promise.resolve() : Promise.reject(),
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorageClear();
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getPermissions: (params) => {
        const roles = localStorage.getItem('roles');
        if(roles) {
            const rolesArray = roles.split(',');
            const role = rolesArray[0];
            return role ? Promise.resolve(role) : Promise.reject();
        }
        return Promise.reject();
    },
};

