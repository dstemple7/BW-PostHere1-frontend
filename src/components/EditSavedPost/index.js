import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import {
  getRecommendations,
  updateSavedPost,
  updatePostWithRecs,
} from '../../actions'

import './style.scss'
import intersperse from '../../util/intersperse'

const EditSavedPost = (props) => {
  const { post } = props

  try {
    post.subredditsAsList = JSON.parse(post.subreddit)
  } catch (e) {
    console.error(
      'Error trying to parse post.subreddit, which is a string containing JSON, maybe. The post was',
      post
    )
    throw e
  }

  const [subredditSuggestions, setSubredditSuggestions] = useState([])

  useEffect(() => {
    setSubredditSuggestions(post.subredditsAsList)
  }, [post])

  if (subredditSuggestions === undefined) {
    console.log('the entire post, with an undefined post.subreddits', post)
  }

  const [title, setTitle] = useState(post.title)
  const [body, setBody] = useState(post.post)

  function onSubmit(e) {
    e.preventDefault()

    const postForSubmitting = {
      title,
      body,
      recs: [],
      postid: post.postid,
    }

    console.log('Right before updating post with recs…')
    props.updatePostWithRecs(postForSubmitting)
  }

  const handlePostUpdate = (e) => {
    e.preventDefault()
    console.log('postid ->', props.post.postid)
    const updatedRedditPost = {
      title: title,
      post: body,
      subreddit: props.post.subreddit,
      postid: props.post.postid,
    }
    props.updateSavedPost(updatedRedditPost)

    props.setIsEditing(false)
  }

  console.log('This is the subreddit suggestions:', subredditSuggestions)

  const [suggestedElements, setSuggestedElements] = useState([])
  useEffect(() => {
    setSuggestedElements(
      subredditSuggestions.map((s) => (
        <a
          data-probability={s.probability}
          href={`https://www.reddit.com/r/${s.subreddit}`}
        >{`/r/${s.subreddit}`}</a>
      ))
    )
  }, [subredditSuggestions])

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
          <p>
            {suggestedElements.length === 0
              ? ''
              : intersperse(suggestedElements, ' · ')}
          </p>
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

export default connect(mapStateToProps, {
  getRecommendations,
  updateSavedPost,
  updatePostWithRecs,
})(EditSavedPost)
