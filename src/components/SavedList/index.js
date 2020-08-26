import React, { useState, useEffect } from 'react'
import './style.scss'
import SavedPost from '../SavedPost'

const savedContent = [
  {
    title: 'Title Number 1 Goes Here',
    body:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using , making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for  will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
    recs: ['dolphins', 'watersports', 'random'],
  },
  {
    title: 'Title of the next thing',
    body:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using , making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for  will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
    recs: ['running', 'biking', 'dogs'],
  },
]

const SavedList = (props) => {
  const [search, setSearch] = useState('')
  const [contents, setContents] = useState(savedContent)

  const onChange = (evt) => {
    setSearch(evt.target.value)
  }

  useEffect(() => {
    const newContents = savedContent.filter(
      (post) =>
        post.title.includes(search) ||
        post.body.includes(search) ||
        post.recs.includes(search)
    )
    setContents(newContents)
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

      {contents.map((post) => {
        return <SavedPost content={post} />
      })}
    </div>
  )
}

export default SavedList
