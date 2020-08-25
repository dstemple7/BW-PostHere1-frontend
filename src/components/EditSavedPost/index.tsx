import React, { useState } from 'react'
import { ConnectedProps, connect } from 'react-redux'

import { ApplicationState } from '../../types'
import { getRecommendations } from '../../actions'

import './style.scss'
import TextPost from '../../types/post'

const EditSavedPost = ({getRecommendations}: Props) => {

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

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

  const handlePostUpdate = (e:any) => {
    e.preventDefault()
  }
  
  return (<div>

        <form onSubmit={onSubmit}>
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
          <div className='button-group'>
            <button onClick={handlePostUpdate}>Update</button>
            <button className='warning'>Delete</button>
            <button type='submit'>Get subreddit recommmendation</button>
          </div>
        </form>
  </div>)

}

const mapStateToProps = (state: ApplicationState) => state // identity function

const mapDispatchToProps = {
  getRecommendations,
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux // & {} // totally local props

export default connector(EditSavedPost)