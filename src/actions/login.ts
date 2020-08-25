import axios, { AxiosResponse } from 'axios'

import LoginCredentials from '../types/login'
import { AppThunk, LoginSuccessResponse, LoginErrorResponse } from '../types'

export const LOGIN_SUCCESS_ACTION = 'LOGIN_SUCCESS_ACTION'

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS_ACTION
  payload: LoginCredentials
}

const createLoginSuccessAction = (payload: LoginCredentials) => ({
  type: LOGIN_SUCCESS_ACTION,
  payload,
})

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

export const logIn = (credentials: LoginCredentials): AppThunk<void> => async (
  dispatch
) => {
  try {
    const resp: AxiosResponse<LoginSuccessResponse> = await axios.put(
      'http://dstemple7-posthere.herokuapp.com/login',
      credentials
    )

    if ('access_token' in resp.data) {
      localStorage.setItem('token', resp.data.access_token)
      dispatch(createLoginSuccessAction(credentials))
    }

    // TODO: handle all the other cases that could crop up that aren't 4xx or 5xx errors
  } catch (e) {
    dispatch(createLoginErrorAction(e.toString()))
  }
}
