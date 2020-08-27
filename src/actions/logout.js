export const LOGOUT_SUCCESS_ACTION = 'LOGOUT_SUCCESS_ACTION'

export const createLogoutSuccessAction = () => (dispatch) => {
  dispatch({type: LOGOUT_SUCCESS_ACTION})
}
