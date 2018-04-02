import { sectionConstants } from '../_constants';

export function sections(state = {}, action) {
  switch (action.type) {
    case sectionConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case sectionConstants.GETALL_SUCCESS:
      return {
        items: action.sections
      };
    case sectionConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case sectionConstants.ADD_REQUEST:
      return {
        ...state,
        adding: true
      };
    case sectionConstants.ADD_SUCCESS:
      return {
        items: [action.section, ...state.items]
      };
    case sectionConstants.ADD_FAILURE:
      return { 
        ...state,
        addError: action.error
      };
    case sectionConstants.DELETE_SUCCESS:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.section._id)
      };
    case sectionConstants.DELETE_FAILURE:
      return { 
        ...state,
        error: action.error
      };
    case sectionConstants.ADD_SHOW_MODAL:
      return {
        ...state,
        showAddModal: true
      };
    case sectionConstants.ADD_CLOSE_MODAL:
      return {
        ...state,
        showAddModal: false
      };
    case sectionConstants.ADD_LINK:
      console.log()
      return Object.assign({}, state, {
        items: state.items.map((section, index) => {
          if (section._id === action.link.section) {
            return Object.assign({}, section, {
              links: [action.link, ...section.links]
            })
          }
          return section
        })
      });
    default:
      return state
  }
}