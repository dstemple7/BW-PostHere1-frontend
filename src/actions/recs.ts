import axios, { AxiosResponse } from 'axios'
import { SubredditSuggestion, AppThunk, PredictionRequest } from '../types'
import TextPost from '../types/post'

export const GET_RECOMMENDATION = 'GET_RECOMMENDATION'

export interface GetRecommendationsAction {
  type: typeof GET_RECOMMENDATION
  payload: SubredditSuggestion[]
}

export const createGetRecommendationsAction = (
  payload: SubredditSuggestion[]
): GetRecommendationsAction => ({
  type: GET_RECOMMENDATION,
  payload,
})

//////////
// Thunks
//

export const getRecommendations = (post: TextPost): AppThunk<void> => async (
  dispatch
) => {
  try {
    const req : PredictionRequest = {
      title: post.title,
      body: post.body,
      n: 2,
    }
    console.log('ready to go with request:', req)
    const resp = await axios.post('https://reddit-log.herokuapp.com/log-predict', req)
    // let's go with AxiosResponse<any> because the response is still in flux
    console.log(resp);
    
  } catch (e) {
    console.error(e)
    // maybe dispatch an error instead of just eating it
  }
}
