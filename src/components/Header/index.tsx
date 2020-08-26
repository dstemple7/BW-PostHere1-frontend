import React from 'react'
import {Link } from 'react-router-dom'
import './style.scss'

const Header = (props: any) => {
  
  const loggedIn = !!localStorage.getItem('token')
  
  return (
    <div className='header'>
      <h1>PostHere</h1>
      <nav>
        {!loggedIn && (
          <div className='header-links'>
            <Link to='/signup' className='link'>
              Sign Up
            </Link>
            <Link to='/login' className='link'>
              Login
            </Link>
          </div>
        )}
        {loggedIn && (
          <div className='header-links'>
            <Link to='/dashboard' className='link'>
              Dashboard
            </Link>
            <Link to='/settings' className='link'>
              Settings
            </Link>
            <Link to='/logout' className='link'>
              Log Out
            </Link>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Header
