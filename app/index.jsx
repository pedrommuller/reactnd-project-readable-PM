/* global document:false, window:false */

import 'purecss/build/pure-min.css';
import 'purecss/build/grids-responsive-min.css';
import '../public/app.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import reducers from './reducers';

import Header from './shared/header.component';
import Footer from './shared/footer.component';
import Home from './home/home.component';
import Detail from './detail/detail.component';

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk, middleware));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Header />
        <Route path="/:category?" exact component={Home} />
        <Route path="/:category/:post_id" exact component={Detail} />
        <Footer />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextReducer = require('./reducers');
    store.replaceReducer(nextReducer);
  });
}
