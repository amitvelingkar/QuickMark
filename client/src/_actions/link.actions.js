import { linkConstants } from '../_constants';
import { linkService } from '../_services';

export const linkActions = {
//    getAll,
    addLink,
    showAddModal,
    closeAddModal,
    deleteLink
};
/*
function getAll(section) {
    return dispatch => {
        dispatch(request());

        linkService.getAll(section)
            .then(
                links => dispatch(success(links)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: linkConstants.GETALL_REQUEST } }
    function success(links) { return { type: linkConstants.GETALL_SUCCESS, links } }
    function failure(error) { return { type: linkConstants.GETALL_FAILURE, error } }
}
*/
function addLink(sectionslug, url, name) {
    return dispatch => {
        dispatch(request());

        linkService.addLink(sectionslug, url, name)
            .then(
                link => dispatch(success(link)),
                error => dispatch(failure(error))
            );
    };

    function request(name) { return { type: linkConstants.ADD_REQUEST } }
    function success(link) { return { type: linkConstants.ADD_SUCCESS, link } }
    function failure(error) { return { type: linkConstants.ADD_FAILURE, error } }
}

function showAddModal() {
    return { type: linkConstants.ADD_SHOW_MODAL };
}

function closeAddModal() {
    return { type: linkConstants.ADD_CLOSE_MODAL };
}

function deleteLink(id, index) {
    return dispatch => {
        linkService.deleteLink(id)
            .then(
                link => dispatch(success(link)),
                error => dispatch(failure(error))
            );
    };

    function success(link) { return { type: linkConstants.DELETE_SUCCESS, link } }
    function failure(error) { return { type: linkConstants.DELETE_FAILURE, error } }
}