import 'purecss/build/pure-min.css'
import 'purecss/build/grids-responsive-min.css'
import '../public/app.css'

import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import React from 'react'
import App from './App'

ReactDOM.render(
  <BrowserRouter>
  <App />
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
