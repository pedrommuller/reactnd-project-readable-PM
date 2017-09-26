import React from 'react'
import {connect} from 'react-redux'

import Question from '../question/question.component'
import Badge from '../shared/badge.component'
import Categories from '../nav/category.component'
import UserList from '../nav/user.component'
import NewQuestion from '../question/new.component'

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
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
    const {user} = this.props;
    return (
      <div className="content-wrapper">
        <div className="content">
          <div className="pure-g">
            <div className="l-box pure-u-1 pure-u-md-1-6 pure-u-lg-1-5">
              <Categories />
            </div>
            <div className="l-box pure-u-1 pure-u-md-2-6 pure-u-lg-3-5">
              <div className="l-box box">
                <Badge color={user.color} initials={user.initials} name={user.name} />
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

function mapStateToProps(state){
  return {
    user:state.users.list[state.users.current]
  }
}

export default connect(mapStateToProps)(Home);
