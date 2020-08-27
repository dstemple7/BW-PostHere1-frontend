import React from 'react'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import Login from './components/Login'
import { Route, Redirect, Switch } from 'react-router-dom'
import SignUp from './components/SignUp'
import LoggedInAsAnybodyRoute from './routes';

function App() {
  return (
    <>
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Redirect from='/' to='/login' />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <LoggedInAsAnybodyRoute path='/dashboard'>
            <Dashboard />
          </LoggedInAsAnybodyRoute>
          <Route path='/signup'>
            <SignUp />
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default App
