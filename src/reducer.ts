import { ApplicationState, initialApplicationState } from './types'
import { Action, SIGNUP_ACTION, GET_RECOMMENDATION, LOGIN_SUCCESS_ACTION } from './actions'

export default function reducer(
  state: ApplicationState = initialApplicationState,
  action: Action
) {
  switch (action.type) {
    case GET_RECOMMENDATION:
      return { ...state, inProgressPost: action.payload }
    case SIGNUP_ACTION:
      // token in localStorage, and all’s right with the world
      // …so do nothing
      return state
    case LOGIN_SUCCESS_ACTION: 
       return { ...state }
      return state
    default:
      return state
  }
}
