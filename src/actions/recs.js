import axios from 'axios'

export const GET_RECOMMENDATION = 'GET_RECOMMENDATION'

export const createGetRecommendationsAction = (payload) => ({
  type: GET_RECOMMENDATION,
  payload,
})

//////////
// Thunks
//

export const getRecommendations = (post) => async (dispatch) => {
  try {
    const req = {
      title: post.title,
      body: post.body,
      n: 2,
    }

    const resp = await axios.post(
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
