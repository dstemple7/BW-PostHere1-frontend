import { ApplicationState, initialApplicationState } from './types'
import { Action } from './actions'

export default function reducer(
  state: ApplicationState = initialApplicationState,
  action: Action
) {
  switch (action.type) {
    default:
      return state
  }
}
