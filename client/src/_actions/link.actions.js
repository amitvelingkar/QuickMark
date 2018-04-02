import { linkConstants, sectionConstants } from '../_constants';
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
function addLink(sectionId, url, name) {
    return dispatch => {
        dispatch(request());

        linkService.addLink(sectionId, url, name)
            .then(
                link => {
                    dispatch(close());
                    dispatch(success(link));
                },
                error => dispatch(failure(error))
            );
    };

    function request(name) { return { type: linkConstants.ADD_REQUEST } }
    function success(link) { return { type: sectionConstants.ADD_LINK, link } }
    function close() { return { type: linkConstants.ADD_CLOSE_MODAL } }
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

    function success(link) { return { type: sectionConstants.DELETE_LINK, link } }
    function failure(error) { return { type: linkConstants.DELETE_FAILURE, error } }
}