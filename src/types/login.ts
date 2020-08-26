import InternalServerError from './spring-ise';

export default interface LoginCredentials {
  username: string
  password: string
}

export interface LoginSuccessResponse {
  access_token: string // looks like a UUID
  token_type: 'bearer'
  scope: 'read trust write'
}

export type LoginResponse = LoginSuccessResponse | InternalServerError
export type LoginErrorResponse = InternalServerError
