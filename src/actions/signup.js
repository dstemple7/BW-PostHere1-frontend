import { createLoginErrorAction } from './login'

import history from '../util/history'
import axiosWithoutAuth from '../api/axiosWithoutAuth'

export const SIGNUP_SUCCESS_ACTION = 'SIGNUP_SUCCESS_ACTION'

/**
 *
 * @param payload The access token.
 */
export const createSignupSuccessAction = (payload) => ({
  type: SIGNUP_SUCCESS_ACTION,
  payload,
})

////////////////////////
// Signup error actions
//

export const SIGNUP_ERROR_ACTION = 'SIGNUP_ERROR_ACTION'

export const createSignupErrorAction = (payload) => ({
  type: SIGNUP_ERROR_ACTION,
  payload,
})

//////////
// Thunks
//

export const signUp = (credentials) => async (dispatch) => {
  try {
    const resp = await axiosWithoutAuth().post(
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
