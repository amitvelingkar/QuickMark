import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user, invitation: {} } : { invitation: {} };

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: false,
        user: null
      };
    case userConstants.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        user: null
      };
    case userConstants.FORGOT_REQUEST:
      return {
        ...state,
        forgot: {
          requesting: true
        }
      };
    case userConstants.FORGOT_SUCCESS:
      return {
        ...state,
        forgot: action.message
      };
    case userConstants.FORGOT_FAILURE:
      return {
        ...state,
        forgot: {
          error: action.error
        }
      };
    case userConstants.RESET_REQUEST:
      return {
        ...state,
        reset: {
          requesting: true
        }
      };
    case userConstants.RESET_SUCCESS:
      return {
        ...state,
        reset: {
          message: "success"
        }
      };
    case userConstants.RESET_FAILURE:
      return {
        ...state,
        reset: {
          error: action.error
        }
      };
    case userConstants.INVITATION_GET_REQUEST:
      return {
        ...state,
        invitation: {
          info: {
            loading: true
          }
        }
      };
    case userConstants.INVITATION_GET_SUCCESS:
      return {
        ...state,
        invitation: {
          info: {
            item: action.item
          }
        }
      };
    case userConstants.INVITATION_GET_FAILURE:
      return {
        ...state,
        invitation: {
          info: {
            error: action.error
          }
        }
      };
    case userConstants.INVITATION_ACCEPT_REQUEST:
      return {
        ...state,
        invitation: {
          accept: {
            loading: true
          }
        }
      };
    case userConstants.INVITATION_ACCEPT_SUCCESS:
      return {
        ...state,
        user: action.user,
        loggedIn: true
      };
    case userConstants.INVITATION_ACCEPT_FAILURE:
      return {
        ...state,
        invitation: {
          accept: {
            error: action.error
          }
        }
      };
    default:
      return state
  }
}