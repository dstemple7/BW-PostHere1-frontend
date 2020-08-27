import axios from 'axios'

import history from '../util/history'

export const LOGIN_SUCCESS_ACTION = 'LOGIN_SUCCESS_ACTION'

const createLoginSuccessAction = (payload) => ({
  type: LOGIN_SUCCESS_ACTION,
  payload,
})

//////////////////////
// Login error action
//

export const LOGIN_ERROR_ACTION = 'LOGIN_ERROR_ACTION'

export const createLoginErrorAction = (payload) => ({
  type: LOGIN_ERROR_ACTION,
  payload,
})

export const logIn = (credentials) => async (dispatch) => {
  try {
    console.log('Preparing for awaiting…')

    const resp = await axios.post(
      'https://dstemple7-posthere.herokuapp.com/login',
      `grant_type=password&username=${credentials.username}&password=${credentials.password}`,
      {
        headers: {
          // btoa is converting our client id/client secret into base64
          Authorization: `Basic ${btoa('lambda-client:lambda-secret')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    console.log('response recieved', resp)

    if ('access_token' in resp.data) {
      localStorage.setItem('token', resp.data.access_token)
      dispatch(createLoginSuccessAction(credentials))
      history.push('/dashboard')
    } else {
      console.warn(
        'access_token wasn’t in the response, but there was no error.',
        resp
      )
    }
  } catch (e) {
    console.error(e.response)
    if (e.response?.data?.error_description === 'Bad credentials') {
      dispatch(
        createLoginErrorAction('Incorrect username/password combination')
      )
    } else if (e.response?.data?.status === 'Unauthorized') {
      console.warn('“Unauthorized” response', e.response)
      dispatch(createLoginErrorAction('Unauthorized. Somehow.'))
    } else {
      console.error(
        'Could not figure out a duck type of login error',
        e.response
      )
      dispatch(createLoginErrorAction(e?.response?.toString() ?? 'mystery error'))
    }
  }
}
