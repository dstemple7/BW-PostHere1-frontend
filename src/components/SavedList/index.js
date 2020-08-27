import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchSavedPosts } from '../../actions'

import './style.scss'
import SavedPost from '../SavedPost'

const SavedList = (props) => {
  const { savedPosts } = props
  const [displayedPosts, setDisplayedPosts] = useState(savedPosts)
  const [search, setSearch] = useState('')

  const onChange = (evt) => {
    setSearch(evt.target.value)
  }

  useEffect(() => {
    props.fetchSavedPosts()
  }, [])

  useEffect(() => {
    if (search === '') {
      setDisplayedPosts(savedPosts)
    } else {
      console.log('saved posts', savedPosts)
      setDisplayedPosts(
        savedPosts.filter((post) => {
          return post.title.includes(search) || post.post.includes(search)
        })
      )

    }
  }, [search, savedPosts])

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

      {displayedPosts.map((post) => {
        return <SavedPost key={post.postid} post={post} />
      })}
    </div>
  )
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps, { fetchSavedPosts })(SavedList)
