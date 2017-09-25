import React from 'react'
import PropTypes from 'prop-types'
import Question from '../question/index'

import Badge from '../shared/badge'
import Categories from '../nav/categories'
import UserList from '../nav/userList'
import NewQuestion from '../question/new'

export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      visible:false
    };
    this.toogleState = this.toogleState.bind(this);
  }

  toogleState(){
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <div className="content-wrapper">
        <div className="content">
          <div className="pure-g">
            <div className="l-box pure-u-1 pure-u-md-1-6 pure-u-lg-1-5">
              <Categories />
            </div>
            <div className="l-box pure-u-1 pure-u-md-2-6 pure-u-lg-3-5">
              <div className="l-box box">
                <Badge initials="PM" name="Pedro Muller" />
                <h2>
                  <a onClick={()=>this.toogleState()}>
                    What is your question?
                  </a>
                </h2>
              </div>

              <NewQuestion close={this.toogleState} visible={this.state.visible} />
              <h1>Questions:</h1>
              <Question />
              <Question />
              <Question />
            </div>
            <div className="l-box pure-u-1 pure-u-md-1-6 pure-u-lg-1-5">
              <UserList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
};
