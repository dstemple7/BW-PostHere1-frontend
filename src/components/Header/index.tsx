import React from 'react'
import {Link } from 'react-router-dom'
import './style.scss'

const Header = (props: any) => {
  
  const loggedIn = true
  
  return (
    <div className='header'>
      <h1>PostHere</h1>
      <nav>
        {!loggedIn && (
          <>
            <Link to='/signup' className='link'>
              Sign Up
            </Link>
            <Link to='/login' className='link'>
              Login
            </Link>
          </>
        )}
        {loggedIn && (
          <>
            <Link to='/settings' className='link'>
              Settings
            </Link>
            <Link to='/logout' className='link'>
              Log Out
            </Link>
          </>
        )}
      </nav>
    </div>
  )
}

export default Header
