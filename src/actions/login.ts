import {
  LoginErrorResponse,
} from '../types'
import LoginCredentials from '../types/login';

export const LOGIN_SUCCESS_ACTION = 'LOGIN_ACTION'

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS_ACTION
  payload: LoginCredentials
}

//////////////////////
// Login error action
//

export const LOGIN_ERROR_ACTION = 'LOGIN_ERROR_ACTION'

export interface LoginErrorAction {
  type: typeof LOGIN_ERROR_ACTION
  payload: any // TODO: flesh out
}

export const createLoginErrorAction = (
  payload: LoginErrorResponse
): LoginErrorAction => ({
  type: LOGIN_ERROR_ACTION,
  payload,
})
