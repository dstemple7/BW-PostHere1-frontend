import React, { useState } from 'react'

import { getRecommendations } from '../../actions'

import './style.scss'
import TextPost from '../../types/post'

const EditSavedPost = (props: any) => {
  const [title, setTitle] = useState(props.content.title)
  const [body, setBody] = useState(props.content.body)
  const [elementSuggestions, setElementSuggestions] = useState(
    props.content.recs as JSX.Element[]
  )

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const post: TextPost = {
      title,
      body,
      recs: [],
    }

    getRecommendations(post)
  }

  const handlePostUpdate = (e: any) => {
    e.preventDefault()
    props.setIsEditing(false)
  }

  return (
    <div>
      <form className='update-post-form' onSubmit={onSubmit}>
        <label>
          Title
          <br />
          <input
            type='text'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Content
          <br />
          <textarea
            className='content-input'
            name='body'
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
        <div className='button-group'>
          <button type='submit'>Get subreddit recommmendation</button>
        </div>
        <div className='suggestions'>
          <p>Subreddit Suggestions:</p>
          <p>/dolphins</p>
        </div>
        <div className='button-group'>
          <button onClick={handlePostUpdate}>Done</button>
          <button className='warning' onClick={props.handleDeleteSavedPost}>Delete</button>
        </div>
      </form>
    </div>
  )
}

export default EditSavedPost
