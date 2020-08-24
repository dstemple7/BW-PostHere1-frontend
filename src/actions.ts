import { Action as ReduxAction } from 'redux'
import { ApplicationState } from './types'

interface PermissiveAction {
  type: string
  payload: any
}

export type Action = PermissiveAction // | …
