import React from 'react'
import {Route}  from 'react-router-dom'

import Header from './shared/header'
import Footer from './shared/footer'
import Home from './home/index'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Route path="/" exact component={Home}></Route>
        <Footer></Footer>
      </div>
    )
  }
}
