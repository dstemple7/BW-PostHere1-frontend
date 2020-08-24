import { Action as ReduxAction } from 'redux'
import {
  ApplicationState,
  LoginErrorResponse,
  LoginCredentials,
  LoginResponse,
  SignupResponse,
} from './types'
import { ThunkAction } from 'redux-thunk'

import axios, { AxiosResponse } from 'axios'

interface PermissiveAction {
  type: string
  payload: any
}

export const SIGNUP_ACTION = 'SIGNUP_ACTION'

interface SignupAction {
  type: typeof SIGNUP_ACTION
  payload: string // the access token
}

/**
 *
 * @param payload The access token.
 */
export const createSignupAction = (payload: string): SignupAction => ({
  type: SIGNUP_ACTION,
  payload,
})

export const LOGIN_ERROR_ACTION = 'LOGIN_ERROR_ACTION'

interface LoginErrorAction {
  type: typeof LOGIN_ERROR_ACTION
  payload: any // TODO: flesh out
}

export const createLoginErrorAction = (
  payload: LoginErrorResponse
): LoginErrorAction => ({
  type: LOGIN_ERROR_ACTION,
  payload,
})

export type Action = LoginErrorAction | SignupAction

///////// Thunks

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ApplicationState,
  unknown,
  ReduxAction<string>
>

export const signUp = (credentials: LoginCredentials): AppThunk<void> => async (
  dispatch
) => {
  try {
    const resp: AxiosResponse<SignupResponse> = await axios.put(
      'http://dstemple7-posthere.herokuapp.com/createnewuser',
      credentials
    )

    if ('access_token' in resp.data) {
      localStorage.setItem('token', resp.data.access_token)
      dispatch(createSignupAction(resp.data.access_token))
    }

    // TODO: handle all the other cases that could crop up that aren't 4xx or 5xx errors
  } catch (e) {
    dispatch(createLoginErrorAction(e.toString()))
  }
}
