import { RELEASES_ALL, RELEASES_NEW, RELEASES_DELETE  } from '@actions/actionTypes'

const INITIAL_STATE = {
  isFetching: false,
  isLoading: false,
  isError: false,
  data: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RELEASES_ALL.REQUESTED:
      return {
        ...state,
        isLoading: true
      }
    
    case RELEASES_ALL.SUCCESS:
      return {
        data: state.data,
        isLoading: false
      }
    
    case RELEASES_ALL.ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    
    case RELEASES_NEW.REQUESTED:
      return {
        ...state,
        isLoading: true
      }
    
    case RELEASES_NEW.SUCCESS:
      return {
        data: [action.payload, ...state.data],
        isLoading: false,
      }
    
    case RELEASES_NEW.ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    
    case RELEASES_DELETE.REQUESTED:
      return {
        ...state,
        isLoading: false,
      }
    
    case RELEASES_DELETE.SUCCESS:
      return INITIAL_STATE

    case RELEASES_DELETE.ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true
      }

    default:
      return state
  }
}