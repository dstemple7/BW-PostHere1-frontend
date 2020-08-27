import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { signUp, createClearRedirectAction } from '../../actions'

import formSchema from './formSchema'
import * as yup from 'yup'

import './style.scss'

// If and when you're ready to upgrade this to TypeScript, simply change the extension of this file to .tsx.
// Then, have me (Nathan) handy, because it'll probably immediately complain about implicit-any problems.
// I'll walk you through them to get your code compiling again. After that, we can work on getting better types for you, like typing the on-form-submit event as a React.FormEvent<HTMLFormElement>.

const initialSignUpValues = {
  username: '',
  password: '',
  confirmPassword: '',
}

const initialErrorValues = {
  username: '',
  password: '',
  confirmPassword: '',
}

function SignUp(props) {
  const history = useHistory()
  const [signUpValues, setSignUpValues] = useState(initialSignUpValues)
  const [errors, setErrors] = useState(initialErrorValues)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    formSchema.isValid(signUpValues).then((valid) => {
      setDisabled(!valid)
    })
  }, [signUpValues])

  const { shouldRedirectTo, createClearRedirectAction } = props
  useEffect(() => {
    if (shouldRedirectTo !== '') {
      history.push(shouldRedirectTo)
      createClearRedirectAction()
    }
  }, [history, shouldRedirectTo, createClearRedirectAction])

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
    setSignUpValues({ ...signUpValues, [name]: value })
  }

  const onSubmit = (evt) => {
    evt.preventDefault()
    const loginSubmit = {
      username: signUpValues.username.trim(),
      password: signUpValues.password.trim(),
    }
    console.log(loginSubmit)
    props.signUp(loginSubmit)
  }

  return (
    <>
      <div className='container'>
        <form onSubmit={onSubmit}>
          <h1>Sign Up</h1>
          <label>Username:</label>
          <p className='error'>{errors.username}</p>
          <input
            name='username'
            type='text'
            placeholder='username'
            value={signUpValues.username}
            onChange={onChange}
          />
          <label>Password:</label>
          <p className='error'>{errors.password}</p>
          <input
            name='password'
            type='password'
            placeholder='password'
            value={signUpValues.password}
            onChange={onChange}
          />
          <label>Confirm Password:</label>
          <p className='error'>{!disabled ? null : errors.confirmPassword}</p>
          <input
            name='confirmPassword'
            type='password'
            placeholder='password'
            value={signUpValues.confirmPassword}
            onChange={onChange}
          />
          <input
            name='submit'
            type='submit'
            value='sign up'
            disabled={disabled}
          />
        </form>
      </div>
    </>
  )
}

const mapStateToProps = (state) => state

const mapDispatchToProps = { signUp, createClearRedirectAction }

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
