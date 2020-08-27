import axiosWithAuth from '../api/axiosWithAuth'

const SAVE_POST = 'SAVE_POST'
const UPDATE_POST = 'UPDATE_POST'
const DELETE_POST = 'DELETE_POST'

export const getSavedPosts = () => dispatch => {
  axiosWithAuth()
    .get('posts/all')
    .then(res => console.log('saved posts ->', res))
    .catch(err => console.log(err))
}

