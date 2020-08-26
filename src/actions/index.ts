import { SignupSuccessAction } from './signup'
import { LoginErrorAction, LoginSuccessAction } from './login'
import { GetRecommendationsAction } from './recs'

export * from './signup'
export * from './login'
export * from './recs'

export type Action =
  | SignupSuccessAction
  | LoginSuccessAction
  | GetRecommendationsAction
  | LoginErrorAction
