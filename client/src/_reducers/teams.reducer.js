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
        adding: true,
        items: state.items
      };
    case teamConstants.ADD_SUCCESS:
      return {
        items: [action.team, ...state.items]
      };
    case teamConstants.ADD_FAILURE:
      return { 
        addError: action.error,
        items: state.items
      };
    default:
      return state
  }
}