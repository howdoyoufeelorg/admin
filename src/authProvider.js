import decodeJwt from 'jwt-decode';

const localStorageItems = [
    'token',
    'expires',
    'roles',
    'id'
];
const localStorageSet = (data) => {
    localStorageItems.forEach(item => localStorage.setItem(item, data[item]));
};
const localStorageClear = () => {
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
                })
            });
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
        const rolesArray = roles.split(',');
        const role = rolesArray[0];
        return roles ? Promise.resolve(role) : Promise.reject();
    },
};

