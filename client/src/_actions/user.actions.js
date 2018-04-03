import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    forgot,
    reset,
    getAll,
    showInviteModal,
    closeInviteModal,
    invite,
    getInvitation,
    acceptInvitation
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/team');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function register(username, email, accountname, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.register(username, email, accountname, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/team');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function forgot(email) {
    return dispatch => {
        dispatch(request());
        userService.forgot(email)
            .then(
                message => { 
                    dispatch(success(message));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function request() { return { type: userConstants.FORGOT_REQUEST } }
    function success(message) { return { type: userConstants.FORGOT_SUCCESS, message } }
    function failure(error) { return { type: userConstants.FORGOT_FAILURE, error } }
}

function reset(password, token) {
    return dispatch => {
        dispatch(request());
        userService.reset(password, token)
            .then(
                user => { 
                    dispatch(success());
                    dispatch(redirect(user));
                    history.push('/team');
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function request() { return { type: userConstants.RESET_REQUEST } }
    function success() { return { type: userConstants.RESET_SUCCESS } }
    function redirect(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.RESET_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function showInviteModal() {
    return { type: userConstants.INVITE_SHOW_MODAL };
}

function closeInviteModal() {
    return { type: userConstants.INVITE_CLOSE_MODAL };
}

function invite(email, role) {
    return dispatch => {
        dispatch(request());
        userService.invite(email, role)
            .then(
                invitation => { 
                    dispatch(success(invitation));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function request() { return { type: userConstants.INVITE_REQUEST } }
    function success(invitation) { return { type: userConstants.INVITE_SUCCESS, invitation } }
    function failure(error) { return { type: userConstants.INVITE_FAILURE, error } }
}

function getInvitation(token) {
    return dispatch => {
        dispatch(request());

        userService.getInvitation(token)
            .then(
                item => dispatch(success(item)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.INVITATION_GET_REQUEST } }
    function success(item) { return { type: userConstants.INVITATION_GET_SUCCESS, item } }
    function failure(error) { return { type: userConstants.INVITATION_GET_FAILURE, error } }
}

function acceptInvitation(name, password, token) {
    return dispatch => {
        dispatch(request());

        userService.acceptInvitation(name, password, token)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/team');
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.INVITATION_GET_REQUEST } }
    function success(user) { return { type: userConstants.INVITATION_GET_SUCCESS, user } }
    function failure(error) { return { type: userConstants.INVITATION_GET_FAILURE, error } }
}