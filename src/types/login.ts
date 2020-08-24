import InternalServerError from './spring-ise';

export default interface LoginCredentials {
  username: string
  password: string
}

export interface LoginSuccessResponse {} // TODO: fill out

export type LoginResponse = LoginSuccessResponse | InternalServerError
export type LoginErrorResponse = InternalServerError
