import { linkConstants } from '../_constants';

export function links(state = {}, action) {
  switch (action.type) {
    case linkConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case linkConstants.GETALL_SUCCESS:
      return {
        items: action.links
      };
    case linkConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case linkConstants.ADD_REQUEST:
      return {
        ...state,
        adding: true
      };
    case linkConstants.ADD_SUCCESS:
      return {
        items: [action.link, ...state.items]
      };
    case linkConstants.ADD_FAILURE:
      return { 
        ...state,
        addError: action.error
      };
    case linkConstants.DELETE_SUCCESS:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.link._id)
      };
    case linkConstants.DELETE_FAILURE:
      return { 
        ...state,
        error: action.error
      };
    case linkConstants.ADD_SHOW_MODAL:
      return {
        ...state,
        showAddModal: true
      };
    case linkConstants.ADD_CLOSE_MODAL:
      return {
        ...state,
        showAddModal: false
      };
    default:
      return state
  }
}