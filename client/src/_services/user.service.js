import { authHeader } from '../_helpers';

export const userService = {
    login,
    register,
    forgot,
    reset,
    logout,
    getAll,
    invite,
    getInvitation,
    acceptInvitation
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch('/api/v1/auth/login', requestOptions)
        .then(response => {
            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                console.log('Login Sucessful - Saving Token to Local Storage');
                console.log(user);
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function register(name, email, accountName, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, accountName })
    };

    return fetch('/api/v1/auth/register', requestOptions)
        .then(response => {
            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                console.log('Login Sucessful - Saving Token to Local Storage');
                console.log(user);
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function forgot(email) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    };

    return fetch('/api/v1/auth/forgot', requestOptions)
    .then(response => {
        if (!response.ok) { 
            return Promise.reject(response.statusText);
        }

        return response.json();
    });
}

function reset(password, token) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
    };

    return fetch('/api/v1/auth/reset/'+token, requestOptions)
    .then(response => {
        if (!response.ok) { 
            return Promise.reject(response.statusText);
        }

        return response.json();
    })
    .then(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log('Login Sucessful - Saving Token to Local Storage');
            console.log(user);
            localStorage.setItem('user', JSON.stringify(user));
        }

        return user;
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log("calling users api", requestOptions);
    return fetch('/api/v1/users2', requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}

function invite(email, role) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ email, role })
    };

    return fetch('/api/v1/auth/invite', requestOptions)
    .then(response => {
        if (!response.ok) { 
            return Promise.reject(response.statusText);
        }

        return response.json();
    });
}

function getInvitation(token) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    console.log("getting invitation", requestOptions);
    return fetch('/api/v1/auth/invitation/'+token, requestOptions).then(handleResponse);
}

function acceptInvitation(name, password, token) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
    };

    console.log("getting invitation", requestOptions);
    return fetch('/api/v1/auth/invitation/'+token, requestOptions).then(handleResponse);
}