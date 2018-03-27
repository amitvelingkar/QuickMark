import { teamConstants } from '../_constants';
import { teamService } from '../_services';

export const teamActions = {
    getAll
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
