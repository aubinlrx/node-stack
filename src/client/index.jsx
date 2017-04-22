// @flow

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'redux'
import { createStore, combineReducers } from 'react-redux'

import App from './app'
import helloReducer from './reducer/hello'
import { APP_CONTAINER_SELECTOR } from '../shared/config'
import { isProduction } from '../shared/utils'

/* eslint-disable no-underscore-dangle */
const store = createStore(combineReducers({ hello: helloReducer }), isProduction ? undefined : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
/* eslint-disable no-underscore-dangle */

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

const wrapApp = (AppComponent, reduxStore) =>
  <Provider store={reduxStore}>
    <AppContainer>
      <AppComponent />
    </AppContainer>
  </Provider>

ReactDOM.render(wrapApp(App, store), rootEl)

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('./app', () => {
    /* eslint-disable global-require */
    const NextApp = require('./app').default
    /* eslint-enable global-require */
    ReactDOM.render(wrapApp(NextApp, store), rootEl)
  })
}
