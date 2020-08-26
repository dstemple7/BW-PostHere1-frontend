import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import history from './util/history'

import './index.scss'

import App from './App'

import reducer from './reducer'

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Router>,
  document.getElementById('root')
)
