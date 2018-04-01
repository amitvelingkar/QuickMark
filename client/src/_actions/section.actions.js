import { sectionConstants } from '../_constants';
import { sectionService } from '../_services';

export const sectionActions = {
    getAll,
    addSection,
    showAddModal,
    closeAddModal,
    deleteSection
};

function getAll(team) {
    return dispatch => {
        dispatch(request());

        sectionService.getAll(team)
            .then(
                sections => dispatch(success(sections)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: sectionConstants.GETALL_REQUEST } }
    function success(sections) { return { type: sectionConstants.GETALL_SUCCESS, sections } }
    function failure(error) { return { type: sectionConstants.GETALL_FAILURE, error } }
}

function addSection(teamslug, name) {
    return dispatch => {
        dispatch(request());

        sectionService.addSection(teamslug, name)
            .then(
                section => dispatch(success(section)),
                error => dispatch(failure(error))
            );
    };

    function request(name) { return { type: sectionConstants.ADD_REQUEST } }
    function success(section) { return { type: sectionConstants.ADD_SUCCESS, section } }
    function failure(error) { return { type: sectionConstants.ADD_FAILURE, error } }
}

function showAddModal() {
    return { type: sectionConstants.ADD_SHOW_MODAL };
}

function closeAddModal() {
    return { type: sectionConstants.ADD_CLOSE_MODAL };
}

function deleteSection(id, index) {
    return dispatch => {
        sectionService.deleteSection(id)
            .then(
                section => dispatch(success(section)),
                error => dispatch(failure(error))
            );
    };

    function success(section) { return { type: sectionConstants.DELETE_SUCCESS, section } }
    function failure(error) { return { type: sectionConstants.DELETE_FAILURE, error } }
}