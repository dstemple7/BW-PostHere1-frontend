import axios from 'axios'
import axiosWithAuth from '../api/axiosWithAuth'
import reducer from '../reducer'
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

export const fetchSavedPosts = () => (dispatch) => {
  dispatch({ type: FETCHING_SAVED_POSTS })
  axiosWithAuth()
    .get('/home/getuserinfo')
    .then((res) => {
      console.log('fetch post ->', res.data)
      const posts = fixUpPosts(res)

      dispatch({ type: FETCH_SAVED_POSTS_SUCCESS, payload: posts })
    })
    .catch((err) => console.log('error', err.response))
}

export const saveNewPost = (newRedditPost) => (dispatch) => {
  axiosWithAuth()
    .post('/posts/post', newRedditPost)
    .then((res) => {
      console.log('create post ->', res)

      axiosWithAuth().get('/home/getuserinfo').then(resp => {
        console.log('all posts after saving new post')
        const posts = fixUpPosts(resp)
        dispatch({ type: SAVE_NEW_POST, payload: posts })
  
      })

    })
    .catch((err) => console.log(err.response))
}

export const updateSavedPost = (updatedRedditPost) => (dispatch) => {
  axiosWithAuth()
    .put(`/posts/post/${updatedRedditPost.postid}`, updatedRedditPost)
    .then((res) => {
      console.log('edit post ->', res)
      dispatch({ type: UPDATE_POST, payload: updatedRedditPost })
    })
    .catch((err) => console.log(err))
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

    console.log(resp)

    post.recs = resp.data

    post.subreddit = JSON.stringify(post.recs)

    try {
      const backendResp = await axiosWithAuth().put(`/posts/post/${post.postid}`, post)
      console.log('backend response when updating post with recs', backendResp)
    } catch (e) {
      console.error('Unfavorable response from the backend when trying to update a post with recs:', e.response)
    }

    console.log('post before update dispatch', post);
    dispatch({ type: UPDATE_POST_WITH_RECS, payload: post })
  } catch (e) {
    console.error(e.response)
  }
}
