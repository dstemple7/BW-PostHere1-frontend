import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getRecommendations, saveNewPost } from '../../actions'

import './style.scss'
import intersperse from '../../util/intersperse'

const CreatePost = (props) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [elementSuggestions, setElementSuggestions] = useState([])

  useEffect(() => {
    const suggestions = props.inProgressPost.recs.map((r) => '/r/' + r.subreddit)
    setElementSuggestions(
      suggestions.map((s) => <a href={`https://reddit.com${s}`}>{s}</a>)
    )
  }, [props.inProgressPost])

  function onSubmit(e) {
    e.preventDefault()

    const post = {
      title,
      body,
      recs: [],
    }

    props.getRecommendations(post)
  }

  const handleSavePost = e => {
    e.preventDefault()

    const newPost = {
      title: title,
      post: body
    }
    props.saveNewPost(newPost)
  }

  return (
    <>
      <section className='create-post'>
        <h2>Create a post</h2>
        <form className='create-post-form' onSubmit={onSubmit}>
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
            <p>{intersperse(elementSuggestions, ' · ')}</p>
          </div>
          <div className='button-group'>
            <button onClick={handleSavePost}>Save Post</button>
          </div>
        </form>
      </section>
    </>
  )
}

const mapStateToProps = (state) => state 

export default connect(mapStateToProps, {getRecommendations, saveNewPost })(CreatePost)
