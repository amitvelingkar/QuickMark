import { teamConstants } from '../_constants';

export function teams(state = {}, action) {
  switch (action.type) {
    case teamConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case teamConstants.GETALL_SUCCESS:
      return {
        items: action.teams
      };
    case teamConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case teamConstants.ADD_REQUEST:
      return {
        ...state,
        adding: true
      };
    case teamConstants.ADD_SUCCESS:
      return {
        items: [action.team, ...state.items]
      };
    case teamConstants.ADD_FAILURE:
      return { 
        ...state,
        addError: action.error
      };
    case teamConstants.ADD_SHOW_MODAL:
      return {
        ...state,
        showAddModal: true
      };
    case teamConstants.ADD_CLOSE_MODAL:
      return {
        ...state,
        showAddModal: false
      };
    default:
      return state
  }
}