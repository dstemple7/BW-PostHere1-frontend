import {
  LoginErrorResponse,
} from '../types'

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
