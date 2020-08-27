import axiosWithAuth from '../api/axiosWithAuth'
import reducer from '../reducer'
export const FETCHING_SAVED_POSTS = 'FETCHING_SAVED_POSTS'
export const FETCH_SAVED_POSTS_SUCCESS = 'FETCH_SAVED_POSTS_SUCCESS'
export const SAVE_NEW_POST = 'SAVE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const FILTER_POSTS = 'FILTER_POSTS'

export const fetchSavedPosts = () => dispatch => {
  dispatch({ type: FETCHING_SAVED_POSTS })
  axiosWithAuth()
    .get('posts/all')
    .then(res => {
      console.log('saved posts ->', res)
      dispatch({ type: FETCH_SAVED_POSTS_SUCCESS, payload: res.data })
    })
    .catch(err => console.log('error',err.response))
}

export const saveNewPost = (newRedditPost) => dispatch => {
  axiosWithAuth()
    .post('/posts/post', newRedditPost)
    .then(res => {
      console.log('create post ->', res)
      dispatch ({type: SAVE_NEW_POST, payload: res.data})
    })
    .catch(err => console.log(err))
}

export const updateSavedPost = (updatedRedditPost) => dispatch => {
  axiosWithAuth()
    .put(`/posts/post/${updatedRedditPost.id}`, updatedRedditPost)
    .then(res => {
      console.log('edit post', res)
      dispatch({type: UPDATE_POST , payload: res.data})
    })
    .catch(err => console.log(err))
}

export const deleteSavedPost = (deletedRedditPost) => dispatch => {
  axiosWithAuth()
    .delete(`/posts/post/${deletedRedditPost.postid}`)
    .then(res => {
      console.log('delete post ->', res)
      dispatch({type: DELETE_POST, payload: deletedRedditPost})
    })
    .catch(err => console.log(err.response))
}

export const setFilteredPosts = (filteredPosts) => dispatch => {
  dispatch({type: FILTER_POSTS, payload: filteredPosts})
}
