import React, { useState } from 'react'
import { deleteSavedPost } from '../../actions'
import { connect } from 'react-redux'

import EditSavedPost from '../EditSavedPost'

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
    setIsEditing(!isEditing)
  }

  return (
    <div className='saved-post'>
      {isEditing ? null : (
        <div className='saved-post-content'>
          <h3>{post.title}</h3>
          <p>{post.post}</p>
          <h4>r/{post.subreddit}</h4>
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
          <EditSavedPost post={post} setIsEditing={setIsEditing} handleDeleteSavedPost={handleDeleteSavedPost}/>
        </div>
      ) : null}
    </div>
  )
}

export default connect(null, {deleteSavedPost})(SavedPost)
