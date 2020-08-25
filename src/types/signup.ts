import InternalServerError from './spring-ise';

export interface SignupSuccess {
  access_token: string // looks like a UUID
  token_type: 'bearer'
  scope: 'read trust write'
}

export type SignupResponse = SignupSuccess | InternalServerError
export type SignupErrorResponse = InternalServerError
