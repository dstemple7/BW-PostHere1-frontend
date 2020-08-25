import axios, { AxiosResponse } from 'axios'

import LoginCredentials from '../types/login'
import { AppThunk, SignupResponse, SignupErrorResponse } from '../types'

import { createLoginErrorAction } from '.'

export const SIGNUP_ACTION = 'SIGNUP_ACTION'

export interface SignupAction {
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

////////////////////////
// Signup error actions
//

export const SIGNUP_ERROR_ACTION = 'SIGNUP_ERROR_ACTION'

export interface SignupErrorAction {
  type: typeof SIGNUP_ERROR_ACTION
  payload: any // TODO: flesh out
}

export const createSignupErrorAction = (
  payload: SignupErrorResponse
): SignupErrorAction => ({
  type: SIGNUP_ERROR_ACTION,
  payload,
})

//////////
// Thunks
//


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
