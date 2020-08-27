import React from 'react'
import './style.scss'

import CreatePost from '../CreatePost'
import SavedList from '../SavedList'
import Trending from '../Trending'

const Dashboard = (props) => {
  return (
    <>
      <div className='dashboard'>
        <CreatePost />
        <SavedList />
        <Trending />
      </div>
    </>
  )
}

export default Dashboard
