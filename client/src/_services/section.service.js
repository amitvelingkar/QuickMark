import { authHeader } from '../_helpers';

export const sectionService = {
    getAll,
    addSection,
    deleteSection
};

function getAll(team) {
    console.log("section service", team);
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/v1/team/${team}/sections`, requestOptions).then(handleResponse);
}

function addSection(name) {
    console.log(name);
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ name })
    };

    return fetch('/api/v1/sections', requestOptions)
        .then(response => {
            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        });
        // TODO - Switch View to new section
}

function deleteSection(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/api/v1/sections/' + id, requestOptions)
        .then(response => {
            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        });
        // TODO - Switch View to new section
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}