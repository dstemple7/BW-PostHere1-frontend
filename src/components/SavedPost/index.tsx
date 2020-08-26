import React, { useState } from 'react'
import './style.scss'
import EditSavedPost from '../EditSavedPost'

const SavedPost = (props: any) => {
  const [isEditing, setIsEditing] = useState(false)
  const { content } = props

  const handleDeleteSavedPost = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log('delete')
  }

  const handleEditSavedPost = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log('editing')
    setIsEditing(!isEditing)
  }

  return (
    <div className='saved-post'>
      {isEditing ? null : (
        <div className='saved-post-content'>
          <h3>{content.title}</h3>
          <p>{content.body}</p>
          <h4>r/{content.recs}</h4>
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
          <EditSavedPost content={content} setIsEditing={setIsEditing} handleDeleteSavedPost={handleDeleteSavedPost}/>
        </div>
      ) : null}
    </div>
  )
}

export default SavedPost
