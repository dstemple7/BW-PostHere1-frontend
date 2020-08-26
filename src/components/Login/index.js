import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import * as yup from 'yup'
import formSchema from './formSchema'

import { logIn } from '../../actions/login'

import './style.scss'

// If and when you're ready to upgrade this to TypeScript, simply change the extension of this file to .tsx.
// Then, have me (Nathan) handy, because it'll probably immediately complain about implicit-any problems.
// I'll walk you through them to get your code compiling again. After that, we can work on getting better types for you, like typing the on-form-submit event as a React.FormEvent<HTMLFormElement>.

const initialLogInValues = {
  username: '',
  password: '',
}

const initialErrorValues = {
  username: '',
  password: '',
}

function Login(props) {
  const [loginValues, setLoginValues] = useState(initialLogInValues)
  const [errors, setErrors] = useState(initialErrorValues)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    formSchema.isValid(loginValues).then((valid) => {
      setDisabled(!valid)
    })
  }, [loginValues])

  const onChange = (evt) => {
    const name = evt.target.name
    const value = evt.target.value
    validateChange(name, value)
  }

  const validateChange = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setErrors({ ...errors, [name]: '' })
      })
      .catch((error) => {
        setErrors({ ...errors, [name]: error.errors[0] })
      })
    setLoginValues({ ...loginValues, [name]: value })
  }

  const onSubmit = (evt) => {
    evt.preventDefault()
    const loginSubmit = {
      username: loginValues.username.trim(),
      password: loginValues.password.trim(),
    }

    console.log(loginSubmit)
    props.logIn(loginSubmit)
  }

  return (
    <>
      <div className='container'>
        <form onSubmit={onSubmit}>
          <h1>Login</h1>
          <label>Username:</label>
          <p className='error'>{errors.username}</p>
          <input
            name='username'
            type='text'
            placeholder='username'
            value={loginValues.username}
            onChange={onChange}
          />
          <label>Password:</label>
          <p className='error'>{errors.password}</p>
          <input
            name='password'
            type='password'
            placeholder='password'
            value={loginValues.password}
            onChange={onChange}
          />
          <input
            name='submit'
            type='submit'
            value='login'
            disabled={disabled}
          />          
          {props.loginErrorMessage.length === 0 ? (
            ''
          ) : (
            <p className='error-message'>{props.loginErrorMessage}</p>
          )}

        </form>
      </div>
    </>
  )
}

const mapStateToProps = (state) => state

const mapDispatchToProps = { logIn }

export default connect(mapStateToProps, mapDispatchToProps)(Login)
