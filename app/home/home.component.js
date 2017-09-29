import React from 'react'
import {connect} from 'react-redux'
import {getHomeData} from './home.actions'

import Badge from '../shared/badge.component'
import Categories from '../nav/category.component'
import UserList from '../nav/user.component'
import Post from '../post/post.component'
import NewPost from '../post/new.component'

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

  componentDidMount(){
    this.props.dispatch(
      getHomeData()
    );
  }

  render() {
    const {user,posts, users, categories, match} = this.props;
    return (
      <div className="content-wrapper">
        <div className="content">
          <div className="pure-g">
            <div className="l-box pure-u-1 pure-u-md-1-6 pure-u-lg-1-5">
              <Categories list={categories} />
            </div>
            <div className="l-box pure-u-1 pure-u-md-2-6 pure-u-lg-3-5">
              <div className="l-box box">
                <Badge color={user.color} initials={user.initials} name={user.name} />
                <h2>
                  <a onClick={()=>this.toogleState()}>
                    What do you have in mind?
                  </a>
                </h2>
              </div>
              <NewPost close={this.toogleState} visible={this.state.visible} />
              <div>
                {match.path!=='/' && match.params.category?`Home > ${match.params.category}`:'Home'}
              </div>
              <h1>Posts:</h1>
              {
                Object.values(posts).map((post)=>
                   <Post key={post.id} post={post} />
                )
              }
            </div>
            <div className="l-box pure-u-1 pure-u-md-1-6 pure-u-lg-1-5">
              <UserList list={users} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  console.log('home state...');
  console.log(state);
  return {
    user:state.users.list[state.users.current],
    posts:state.posts.list,
    users:state.users.list,
    categories:state.categories.list
  }
}

export default connect(mapStateToProps)(Home);
