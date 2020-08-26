import LoginCredentials from '../types/login'
import { AppThunk, SignupResponse, SignupErrorResponse } from '../types'

import { createLoginErrorAction } from './login'

import history from '../util/history'
import axiosWithoutAuth, {AxiosResponse} from '../api/axiosWithoutAuth';

export const SIGNUP_SUCCESS_ACTION = 'SIGNUP_SUCCESS_ACTION'

export interface SignupSuccessAction {
  type: typeof SIGNUP_SUCCESS_ACTION
  payload: string // the access token
}

/**
 *
 * @param payload The access token.
 */
export const createSignupSuccessAction = (
  payload: string
): SignupSuccessAction => ({
  type: SIGNUP_SUCCESS_ACTION,
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
    const resp: AxiosResponse<SignupResponse> = await axiosWithoutAuth().post(
      '/createnewuser',
      credentials
    )

    console.log(resp)

    if ('access_token' in resp.data) {
      // definitely a success response
      localStorage.setItem('token', resp.data.access_token)
      console.log(resp)

      dispatch(createSignupSuccessAction(resp.data.access_token))
      history.push('/login')

    }

    // TODO: handle all the other cases that could crop up that aren't 4xx or 5xx errors
  } catch (e) {
    console.error(e.response)
    dispatch(createLoginErrorAction(e.response.toString()))
  }
}
