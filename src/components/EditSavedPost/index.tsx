import React, { useState, useEffect } from 'react'
import { ConnectedProps, connect } from 'react-redux'

import { ApplicationState } from '../../types'
import { getRecommendations } from '../../actions'

import './style.scss'
import TextPost from '../../types/post'
import intersperse from '../../util/intersperse'

const EditSavedPost = (props: Props) => {
  const { getRecommendations, inProgressPost } = props

  const [title, setTitle] = useState(props.content.title)
  const [body, setBody] = useState(props.content.body)
  const [elementSuggestions, setElementSuggestions] = useState(
    props.content.recs
  )
  const [elementSuggestionsAsLinks, setElementSuggestionsAsLinks] = useState(
    [] as JSX.Element[]
  )

  useEffect(() => {
    const suggestions = inProgressPost.recs.map((r) => '/r/' + r.subreddit)
    setElementSuggestionsAsLinks(
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

    getRecommendations(post)
  }

  const handlePostUpdate = (e: any) => {
    e.preventDefault()
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
          <p>{intersperse(elementSuggestions, ' · ')}</p>
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

const mapStateToProps = (state: ApplicationState) => state // identity function

const mapDispatchToProps = {
  getRecommendations,
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  content: TextPost
  setIsEditing: (anything:boolean) =>void
  handleDeleteSavedPost: (e: React.MouseEvent) => void
} // totally local props

export default connector(EditSavedPost)
