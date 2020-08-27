import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createLogoutSuccessAction } from '../../actions'
import './style.scss'

const Header = (props) => {
  const loggedIn = !!localStorage.getItem('token')

  function onLogout() {
    localStorage.removeItem('token')
    props.createLogoutSuccessAction()
  }

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
            <Link to='/' className='link' onClick={onLogout}>
              Log Out
            </Link>
          </div>
        )}
      </nav>
    </div>
  )
}

const mapStateToProps = (state) => state

const mapDispatchToProps = { createLogoutSuccessAction }

export default connect(mapStateToProps, mapDispatchToProps)(Header)
