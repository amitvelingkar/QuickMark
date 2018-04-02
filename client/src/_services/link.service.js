import { authHeader } from '../_helpers';

export const linkService = {
//    getAll,
    addLink,
    deleteLink
};
/*
function getAll(section) {
    console.log("link service", section);
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/v1/section/${section}/links`, requestOptions).then(handleResponse);
}
*/
function addLink(section, url, name) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ url, name })
    };

    return fetch(`/api/v1/section/${section}/links`, requestOptions)
        .then(response => {
            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        });
        // TODO - Switch View to new link
}

function deleteLink(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/api/v1/links/' + id, requestOptions)
        .then(response => {
            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        });
        // TODO - Switch View to new link
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}