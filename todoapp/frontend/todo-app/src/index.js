import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';
import {BrowserRouter} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './redux/reducer'
import {Provider} from 'react-redux'
import App from './App'
import thunk from 'redux-thunk'
import dataService from './redux/dataService'
import logger from './redux/logger'

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk,logger,dataService))
store.dispatch({ type: 'GET_TODO_DATA' })

ReactDOM.render(<Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>, document.getElementById('root'))
