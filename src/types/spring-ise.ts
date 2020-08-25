export default interface InternalServerError {
  title: 'Internal Server Error'
  status: 500
  detail: string
  timestamp: string
  developerMessage: string
  errors: any[]
}
