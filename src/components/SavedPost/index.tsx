import React from 'react'
import './style.scss'

const SavedPost = (props: any) => {
  const { content } = props

  return (
    <div className='saved-post'>
      <h3>{content.title}</h3>
      <p>{content.body}</p>
    </div>
  )
}

export default SavedPost
