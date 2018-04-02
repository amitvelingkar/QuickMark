import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
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
    default:
      return state
  }
}