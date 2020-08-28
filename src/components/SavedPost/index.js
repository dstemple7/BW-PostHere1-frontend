import React, { useState } from 'react'
import { getRecommendations, deleteSavedPost } from '../../actions'
import { connect } from 'react-redux'

import EditSavedPost from '../EditSavedPost'

import intersperse from '../../util/intersperse'

import './style.scss'

const SavedPost = (props) => {
  const { post } = props

  const [isEditing, setIsEditing] = useState(false)

  const handleDeleteSavedPost = (e) => {
    e.preventDefault()
    console.log('delete')
    console.log(post)
    props.deleteSavedPost(post)
  }

  const handleEditSavedPost = (e) => {
    e.preventDefault()
    console.log('editing')
    setIsEditing(true)
  }

  // console.log(
  //   'this is post.subreddit in its unvarnished glory:',
  //   post.subreddit
  // )
  if (
    post.subreddit === '' ||
    post.subreddit === [] ||
    typeof post.subreddit === 'object' ||
    post.subreddit === undefined
  ) {
    post.subreddit = '[]'
  }

  let subreddits = JSON.parse(post.subreddit)
  if (typeof subreddits !== typeof []) {
    subreddits = []
  }

  let subredditFragments = subreddits.map((s) => (
    <a key={s.subreddit}
      href={`https://www.reddit.com/r/${s.subreddit}`}
      data-probability={s.probability}
    >
      {s.subreddit}
    </a>
  ))

  return (
    <div className='saved-post'>
      {isEditing ? null : (
        <div className='saved-post-content'>
          <h3>{post.title}</h3>
          <p>{post.post}</p>
          {intersperse(subredditFragments, ' · ')}
          <div className='button-group'>
            <button onClick={handleEditSavedPost}>Edit </button>
            <button className='warning' onClick={handleDeleteSavedPost}>
              Delete
            </button>
          </div>
        </div>
      )}
      {isEditing ? (
        <div className='saved-post-content'>
          <EditSavedPost
            post={post}
            setIsEditing={setIsEditing}
            handleDeleteSavedPost={handleDeleteSavedPost}
          />
        </div>
      ) : null}
    </div>
  )
}

export default connect(null, { getRecommendations, deleteSavedPost })(SavedPost)
