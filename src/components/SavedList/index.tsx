import React, { useState, useEffect } from 'react'
import './style.scss'
import SavedPost from '../SavedPost'

const savedContent = [
  {
    title: 'Title Number 1 Goes Here',
    body:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using , making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for  will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
    subreddit: 'dolphins'
  },
  {
    title: 'Title of the next thing',
    body:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using , making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for  will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
      subreddit: 'running'
  },
]

const SavedList = (props: any) => {

  const [ search, setSearch ] = useState('')
  const [ contents, setContents ] = useState(savedContent)

  const onChange = (evt: any) => {
    setSearch(evt.target.value)
  }

  useEffect(() => {
    const newContents = savedContent.filter( post => post.title.includes(search) || post.body.includes(search) || post.subreddit.includes(search) )
    setContents(newContents)
  }, [search])

  return (
    <div className='saved-list'>
      <h2>Saved posts</h2>
      <form>
        <label>Search:</label>
        <input
          name='search'
          type='text'
          value={search}
          onChange={onChange}
        />
      </form>
      {contents.map((post) => {
        return <SavedPost content={post} />
      })}
    </div>
  )
}

export default SavedList
