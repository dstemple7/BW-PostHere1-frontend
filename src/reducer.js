import {
  SIGNUP_SUCCESS_ACTION,
  GET_RECOMMENDATION,
  LOGIN_SUCCESS_ACTION,
  LOGIN_ERROR_ACTION,
  FETCHING_SAVED_POSTS,
  FETCH_SAVED_POSTS_SUCCESS,
  SAVE_NEW_POST,
  UPDATE_POST,
  DELETE_POST,
  FILTER_POSTS,
  CLEAR_REDIRECT,
  CLEAR_POST_SAVED_SUCCESS_MESSAGE,
  UPDATE_POST_WITH_RECS,
  LOGOUT_SUCCESS_ACTION,
} from './actions'

export const initialApplicationState = {
  signupErrorMessage: '',
  loginErrorMessage: '',

  isLoggedIn: false,

  isLoadingFromDS: false,
  isLoadingFromBackend: false,

  inProgressPost: { title: '', body: '', recs: [], postid: -1 },

  searchText: '',

  shouldRedirectTo: '',

  savedPosts: [],

  savedSuccessMessage: '',
}

export default function reducer(state = initialApplicationState, action) {
  switch (action.type) {
    case GET_RECOMMENDATION:
      return { ...state, inProgressPost: action.payload }
    case SIGNUP_SUCCESS_ACTION:
      return { ...state, shouldRedirectTo: '/dashboard' }
    case LOGIN_SUCCESS_ACTION:
      return { ...state, shouldRedirectTo: '/dashboard', isLoggedIn: true }
    case LOGIN_ERROR_ACTION:
      return { ...state, loginErrorMessage: action.payload }
    case LOGOUT_SUCCESS_ACTION:
      return { ...state, isLoggedIn: false }
    case FETCHING_SAVED_POSTS:
      return { ...state, isLoadingFromBackend: true }
    case FETCH_SAVED_POSTS_SUCCESS:
      return { ...state, savedPosts: action.payload }
    case FILTER_POSTS:
      return { ...state, savedPosts: action.payload }
    case DELETE_POST:
      return {
        ...state,
        savedPosts: state.savedPosts.filter(
          (item) => item.postid !== action.payload.postid
        ),
      }
    case SAVE_NEW_POST:
      return {
        ...state,
        savedSuccessMessage: 'Post created successfully!',
        savedPosts: action.payload,
      }
    case UPDATE_POST:
    // fallthrough
    case UPDATE_POST_WITH_RECS:
      return {
        ...state,
        savedPosts: state.savedPosts.map((p) => {
          if (Number(p.postid) === Number(action.payload.postid)) {
            console.log(
              'yes, there actually was a match in the updater',
              action.payload
            )
            return action.payload
          } else {
            return p
          }
        }),
      }
    case CLEAR_POST_SAVED_SUCCESS_MESSAGE:
      return { ...state, savedSuccessMessage: '' }
    case CLEAR_REDIRECT:
      return { ...state, shouldRedirectTo: '' }
    default:
      return state
  }
}
