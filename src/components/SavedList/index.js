import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import {fetchSavedPosts} from '../../actions'

import './style.scss'
import SavedPost from '../SavedPost'



const SavedList = (props) => {
  const [search, setSearch] = useState('')

  const onChange = (evt) => {
    setSearch(evt.target.value)
  }

  useEffect(() => {
    props.fetchSavedPosts()
  }, [])

  useEffect(() => {
    const filteredPosts = props.savedPosts.filter(
      (post) => {
        post.title.includes(search) ||
        post.post.includes(search) 
      }
    )
  }, [search])

  return (
    <div className='saved-list'>
      <h2>Saved posts</h2>

      <label className='search'>
        <span className='fa fa-search'></span>
        <input
          placeholder='Search...'
          name='search'
          type='text'
          value={search}
          onChange={onChange}
        />
      </label>

      {props.savedPosts.map((post) => {
        return <SavedPost post={post} />
      })}
    </div>
  )
}

const mapStateToProps = (state) => state 

export default connect(mapStateToProps, {fetchSavedPosts})(SavedList)
