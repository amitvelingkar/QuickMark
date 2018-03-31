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
        headers: authHeader(),
        body: JSON.stringify({ name })
    };

    return fetch('/api/v1/teams', requestOptions)
        .then(response => {
            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        });
        // TODO - Switch View to new team
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}