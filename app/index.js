import 'purecss/build/pure-min.css'
import 'purecss/build/grids-responsive-min.css'
import '../public/app.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {Route}  from 'react-router-dom'
import {createStore, combineReducers, applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import reducers from './reducers'

const history = createHistory()
const middleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk,middleware))

import Header from './shared/header.component'
import Footer from './shared/footer.component'
import Home from './home/home.component'

ReactDOM.render(
  <Provider store={store}>
     <ConnectedRouter history={history}>
       <div>
         <Header></Header>
         <Route path="/:category?" exact component={Home}></Route>
         <Footer></Footer>
       </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./reducers',()=>{
    const nextReducer = require('./reducers');
    store.replaceReducer(nextReducer);
  });
}
