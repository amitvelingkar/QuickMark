import { teamConstants } from '../_constants';
import { teamService } from '../_services';

export const teamActions = {
    getAll,
    addTeam,
    showAddModal,
    closeAddModal
};

function getAll() {
    return dispatch => {
        dispatch(request());

        teamService.getAll()
            .then(
                teams => dispatch(success(teams)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: teamConstants.GETALL_REQUEST } }
    function success(teams) { return { type: teamConstants.GETALL_SUCCESS, teams } }
    function failure(error) { return { type: teamConstants.GETALL_FAILURE, error } }
}

function addTeam(name) {
    return dispatch => {
        dispatch(request());

        teamService.addTeam(name)
            .then(
                team => dispatch(success(team)),
                error => dispatch(failure(error))
            );
    };

    function request(name) { return { type: teamConstants.ADD_REQUEST } }
    function success(team) { return { type: teamConstants.ADD_SUCCESS, team } }
    function failure(error) { return { type: teamConstants.ADD_FAILURE, error } }
}

function showAddModal() {
    return { type: teamConstants.ADD_SHOW_MODAL };
}

function closeAddModal() {
    return { type: teamConstants.ADD_CLOSE_MODAL };
}
