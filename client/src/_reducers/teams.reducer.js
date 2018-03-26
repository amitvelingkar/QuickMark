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
    default:
      return state
  }
}