import axios from 'axios'
import axiosWithAuth from '../api/axiosWithAuth'
export const FETCHING_SAVED_POSTS = 'FETCHING_SAVED_POSTS'
export const FETCH_SAVED_POSTS_SUCCESS = 'FETCH_SAVED_POSTS_SUCCESS'
export const SAVE_NEW_POST = 'SAVE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const UPDATE_POST_WITH_RECS = 'UPDATE_POST_WITH_RECS'
export const DELETE_POST = 'DELETE_POST'
export const FILTER_POSTS = 'FILTER_POSTS'
export const CLEAR_POST_SAVED_SUCCESS_MESSAGE =
  'CLEAR_POST_SAVED_SUCCESS_MESSAGE'

function fixUpPosts(resp) {
  const posts = resp.data.posts.map((o) => o.post)
  for (const post of posts) {
    if (post.subreddit === null) post.subreddit = []
  }
  return posts
}

async function getSavedPosts() {
  const resp = await axiosWithAuth().get('/home/getuserinfo')
  const posts = fixUpPosts(resp)
  return posts
}

export const fetchSavedPosts = () => async (dispatch) => {
  dispatch({ type: FETCHING_SAVED_POSTS })
  try {
    const posts = await getSavedPosts()
    dispatch({ type: FETCH_SAVED_POSTS_SUCCESS, payload: posts })
  } catch (err) {
    console.log('error', err.response)
  }
}

export const saveNewPost = (newRedditPost) => async (dispatch) => {
  try {
    await axiosWithAuth().post('/posts/post', newRedditPost)
    const posts = await getSavedPosts()
    dispatch({ type: SAVE_NEW_POST, payload: posts })
  } catch (e) {
    console.error(e.response)
  }
}

export const updateSavedPost = (updatedRedditPost) => async (dispatch) => {
  try {
    await axiosWithAuth().put(
      `/posts/post/${updatedRedditPost.postid}`,
      updatedRedditPost
    )
    const posts = await getSavedPosts()
    dispatch({ type: UPDATE_POST, payload: posts })
  } catch (e) {
    console.error(e.response)
  }
}

export const deleteSavedPost = (deletedRedditPost) => (dispatch) => {
  axiosWithAuth()
    .delete(`/posts/post/${deletedRedditPost.postid}`)
    .then((res) => {
      console.log('delete post ->', res)
      dispatch({ type: DELETE_POST, payload: deletedRedditPost })
    })
    .catch((err) => console.log(err.response))
}

export const setFilteredPosts = (filteredPosts) => (dispatch) => {
  dispatch({ type: FILTER_POSTS, payload: filteredPosts })
}

export const clearPostSavedSuccessMessage = () => (dispatch) => {
  dispatch({ type: CLEAR_POST_SAVED_SUCCESS_MESSAGE })
}

export const updatePostWithRecs = (post) => async (dispatch) => {
  try {
    const req = {
      title: post.title,
      body: post.body,
      n: 2,
    }

    const resp = await axios.post(
      'https://dave-ds-api.herokuapp.com/predict',
      req
    )

    post.recs = resp.data

    post.subreddit = JSON.stringify(post.recs)

    try {
      await axiosWithAuth().put(`/posts/post/${post.postid}`, post)
      const posts = await getSavedPosts()
      dispatch({ type: UPDATE_POST_WITH_RECS, payload: posts })
    } catch (e) {
      console.error('update post: error response:', e.response)
    }
  } catch (e) {
    console.error(e.response)
  }
}
