import {
  SIGNUP_SUCCESS_ACTION,
  GET_RECOMMENDATION,
  LOGIN_SUCCESS_ACTION,
  LOGIN_ERROR_ACTION,
} from './actions'

export const initialApplicationState = {
  signupErrorMessage: '',
  loginErrorMessage: '',

  isLoadingFromDS: false,
  isLoadingFromBackend: false,

  inProgressPost: { title: '', body: '', recs: [] },

  searchText: '',

  savedPosts: [],
}

export default function reducer(state = initialApplicationState, action) {
  switch (action.type) {
    case GET_RECOMMENDATION:
      return { ...state, inProgressPost: action.payload }
    case SIGNUP_SUCCESS_ACTION:
      // token in localStorage, and all’s right with the world
      // …so do nothing
      return state
    case LOGIN_SUCCESS_ACTION:
      // nothing to do here
      return state
    case LOGIN_ERROR_ACTION:
      return { ...state, loginErrorMessage: action.payload }
    default:
      return state
  }
}
