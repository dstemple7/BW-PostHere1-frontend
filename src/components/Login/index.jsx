import React, { useState, useEffect } from 'react'

import './style.scss'

// If and when you're ready to upgrade this to TypeScript, simply change the extension of this file to .tsx.
// Then, have me (Nathan) handy, because it'll probably immediately complain about implicit-any problems.
// I'll walk you through them to get your code compiling again. After that, we can work on getting better types for you, like typing the on-form-submit event as a React.FormEvent<HTMLFormElement>.

const initialLogInValues = {
  username: '',
  password: ''
}

const initialErrorValues = {
  username: '',
  password: ''
}

export default function Login() {

  const [ loginValues, setLoginValues ] = useState(initialLogInValues)
  const [ errors, setErrors ] = useState(initialErrorValues);

  const onChange = (evt) => {
    const name = evt.target.name
    const value = evt.target.value
    validateChange( name, value)
  }

  const validateChange = (name, value) => {

    setLoginValues({...loginValues, [name]: value})
  }
  
  const onSubmit = (evt) => {
  
  }

  return (
  <>
    <div className='container'>
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
        <label>Username:</label>
        <input
          name='username'
          type='text'
          placeholder='username'
          value={loginValues.username}
          onChange={onChange}

        />
        <label>Password:</label>
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
          value='submit'

        />
      </form>
    </div>
  </>
  )
}
