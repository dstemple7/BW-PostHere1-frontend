import React from 'react'
import './style.scss'

import Header from '../Header'
import CreatePost from '../CreatePost'
import SavedList from '../SavedList'

const Dashboard = (props: any) => {
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
