import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getRecommendations, updateSavedPost } from '../../actions'

import './style.scss'
import intersperse from '../../util/intersperse'

const EditSavedPost = (props) => {

  const { post } = props

  const [title, setTitle] = useState(post.title)
  const [body, setBody] = useState(post.post)

  function onSubmit(e) {
    e.preventDefault()

    const post = {
      title,
      body,
      recs: [],
    }

    getRecommendations(post)
  }

  const handlePostUpdate = (e) => {
    e.preventDefault()
    const updatedRedditPost = {
      title: title,
      post: body,
      subreddit: props.post.subreddit,
      postid: props.post.postid,
    }
    props.updateSavedPost(updatedRedditPost)

    props.setIsEditing(false)
  }

  return (
    <div>
      <form className='edit-saved-post' onSubmit={onSubmit}>
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
          <button type='submit'>Get subreddit suggestions</button>
        </div>
        <div className='suggestions'>
          <p>Subreddit Suggestions:</p>
          {/* <p>{subRedditSuggestions === "" ? "" : intersperse(subRedditSuggestions, ' · ')}</p> */}
        </div>
        <div className='button-group'>
          <button onClick={handlePostUpdate}>Done</button>
          <button className='warning' onClick={props.handleDeleteSavedPost}>
            Delete
          </button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => state


export default connect(mapStateToProps, { getRecommendations, updateSavedPost })(EditSavedPost)
