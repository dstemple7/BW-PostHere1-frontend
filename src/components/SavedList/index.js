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
    console.log('saved posts', savedPosts)
    if (search === '') {
      setDisplayedPosts(savedPosts)
    } else {
      const re = new RegExp(search, 'i')
      setDisplayedPosts(
        savedPosts.filter((post) => {
          // post.subreddit is a string containing JSON at this point
          return (
            post.title.match(re) ||
            post.post.match(re) ||
            post.subreddit.match(re)
          )
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
