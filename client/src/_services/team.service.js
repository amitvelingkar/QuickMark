import { authHeader } from '../_helpers';

export const teamService = {
    getAll,
    addTeam
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/v1/teams', requestOptions).then(handleResponse);
}

function addTeam(name) {
    console.log(name);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YWFhYzYyOTRmM2YxMWZjN2E2M2ZiMGYiLCJleHAiOjE1MjUwNTYwNDk2NjYsImlhdCI6MTUyMjQ2NDA0OX0.FmR3pFRr0A4THmuOJQ7Y2ah333raudsoK3bQZFSdfsg' },
        body: JSON.stringify({ name })
    };

    return fetch('/api/v1/teams', requestOptions)
        .then(response => {
            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        });
        /*
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
        */
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}