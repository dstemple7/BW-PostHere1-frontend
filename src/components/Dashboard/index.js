import React from 'react'
import './style.scss'

import CreatePost from '../CreatePost'
import SavedList from '../SavedList'

const Dashboard = (props) => {
  return (
    <>
      <div className='dashboard'>
        <CreatePost />
        <SavedList />
      </div>
    </>
  )
}

export default Dashboard
