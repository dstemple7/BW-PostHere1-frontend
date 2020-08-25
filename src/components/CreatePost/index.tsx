import React, { useState, useEffect } from 'react'
import { ConnectedProps, connect } from 'react-redux'

import { ApplicationState } from '../../types'
import { getRecommendations } from '../../actions'

import './style.scss'
import TextPost from '../../types/post'
import intersperse from '../../util/intersperse'

const CreatePost = ({ getRecommendations, inProgressPost }: Props) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [elementSuggestions, setElementSuggestions] = useState(
    [] as JSX.Element[]
  )

  useEffect(() => {
    const suggestions = inProgressPost.recs.map((r) => '/r/' + r.subreddit)
    setElementSuggestions(
      suggestions.map((s) => <a href={`https://reddit.com${s}`}>{s}</a>)
    )
  }, [inProgressPost])

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const post: TextPost = {
      title,
      body,
      recs: [],
    }
    console.log('in onSubmit…', post)

    getRecommendations(post)
  }

  return (
    <>
      <section className='create-post'>
        <h2>Create a post</h2>
        <form className='create-post-form' onSubmit={onSubmit}>
          <label>
            Post Title
            <br />
            <input
              type='text'
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Post
            <br />
            <textarea
              className='content-input'
              name='body'
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
          <button type='submit'>Get subreddit recommmendation</button>
          {elementSuggestions.length === 0 ? (
            ''
          ) : (
            <div>
              <p>
                Subreddit Suggestions: {intersperse(elementSuggestions, ' · ')}
              </p>
            </div>
          )}
          <div className='button-group'>
            <button>Save Post</button>
          </div>
          
        </form>
      </section>
    </>
  )
}

const mapStateToProps = (state: ApplicationState) => state // identity function

const mapDispatchToProps = {
  getRecommendations,
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux // & {} // totally local props

export default connector(CreatePost)
