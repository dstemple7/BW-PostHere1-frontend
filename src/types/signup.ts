import InternalServerError from './spring-ise'

export interface SignupSuccessResponse {
  access_token: string // looks like a UUID
  token_type: 'bearer'
  scope: 'read trust write'
}

export type SignupResponse = SignupSuccessResponse | InternalServerError
export type SignupErrorResponse = InternalServerError
