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
                localStorage.setItem('token', token);
            });
    },
    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    checkAuth: () => localStorage.getItem('token') ? Promise.resolve() : Promise.reject(),
    checkError: (error) => {
        const status = error.status;
        console.log('checkError',status);
        if (status === 401 || status === 403) {
            console.log('Removing token!');
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getPermissions: (params) => {
        return Promise.resolve()
    },
};

