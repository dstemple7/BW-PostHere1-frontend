export interface PredictionRequest {
  title: string
  body: string
  n: number // The number of subreddit suggestions to get.
}

// Comes with an HTTP 200.
export interface PredictionSuccessResponse {
  subreddit_prediction: string[]
}

// Comes with an HTTP 422.
export interface PredictionErrorResponse {
  detail: PredictionErrorDetails[]
}

export interface PredictionErrorDetails {
  loc: string[]
  msg: string
  type: string
}

export type PredictionResponse =
  | PredictionSuccessResponse
  | PredictionErrorResponse
