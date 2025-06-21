import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { App } from './app'
import { Context, store } from './store'

ReactDOM.render(
  <Context.Provider value={store}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
)
