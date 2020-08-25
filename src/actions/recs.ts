import axios, { AxiosResponse } from 'axios'
import { AppThunk, PredictionRequest } from '../types'
import TextPost from '../types/post'

export const GET_RECOMMENDATION = 'GET_RECOMMENDATION'

export interface GetRecommendationsAction {
  type: typeof GET_RECOMMENDATION
  payload: TextPost
}

export const createGetRecommendationsAction = (
  payload: TextPost
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
    const req: PredictionRequest = {
      title: post.title,
      body: post.body,
      n: 2,
    }

    // <any> because the DS team is still in flux
    const resp: AxiosResponse<any> = await axios.post(
      'https://reddit-log.herokuapp.com/log-predict',
      req
    )

    console.log(resp)

    for (const sug of resp.data.sub_pred) {
      post.recs.push({ subreddit: sug[0], probability: sug[1] })
    }

    dispatch(createGetRecommendationsAction(post))
  } catch (e) {
    console.error(e)
    // maybe dispatch an error instead of just eating it
  }
}
