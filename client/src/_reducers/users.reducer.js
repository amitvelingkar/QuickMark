import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case userConstants.INVITE_SHOW_MODAL:
      return {
        ...state,
        showInviteModal: true
      };
    case userConstants.INVITE_CLOSE_MODAL:
      return {
        ...state,
        showInviteModal: false
      };
    case userConstants.INVITE_REQUEST:
      return {
        ...state,
        inviting: true
      };
    case userConstants.INVITE_SUCCESS:
      return {
        ...state,
        showInviteModal: false,
        items: {
          ...state.items,
          invitations: [action.invitation, ...state.items.invitations]
        }
      };
    case userConstants.INVITE_FAILURE:
      return {
        ...state,
        errorInvite: action.error
      };
    default:
      return state
  }
}