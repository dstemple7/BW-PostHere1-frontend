import React from 'react'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import Login from './components/Login'
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <>
      <div className='App'>
        <Header />
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/'>
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default App
