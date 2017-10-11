import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {isEmpty} from 'lodash/lang'
import {orderBy} from 'lodash/collection'

import {getHomeData, getPostsByCategory, deleteCurrentPost, votePostHome, orderPostBy}
from './home.actions'

import {setCurrentUser} from '../nav/user.actions'

import Badge from '../shared/badge.component'
import Categories from '../nav/category.component'
import UserList from '../nav/user.component'
import Post from '../post/post.component'
import NewPost from '../post/new.component'

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible:false,
      post:{}
    };
    this.toogleState = this.toogleState.bind(this);
    this.getCategoryFronPath = this.getCategoryFromPath.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.voteHandler = this.voteHandler.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
    
    this.props.history.listen((location, action)=>{
      if(location.state && location.state.routeType){
        this.props.dispatch(
          getPostsByCategory(location.pathname.replace('/',''))
        );
      }
    });
  }

  setCurrentUser(userId){
    this.props.dispatch(setCurrentUser(userId));
  }

  toogleState(){
    this.setState({
      visible: !this.state.visible
    });
  }

  voteHandler(postId,option){
    this.props.dispatch(
      votePostHome(postId,option)
    );
  }

  handleAction(e, value, action){
    switch (action) {
      case 'edit':
        this.setState({
          post:value
        });
        this.toogleState();
        break;
      case 'delete':
        if(confirm('Do you want to delete this post?')){
          this.props.dispatch(deleteCurrentPost(value.id))
        }
        break;
      case 'sortby':
        this.props.dispatch(OrderPostBy(value));
        break;
    }
  }

  componentDidMount(){
    this.props.dispatch(
      getHomeData(location.pathname.replace('/',''))
    );
  }

  getCategoryFromPath(path) {
    return this.props.categories.filter(x=>x.path===path).map(e=>e.name);
  }

  render() {
    const {user,posts, users, categories, match} = this.props;
    const postList = Object.values(posts).length>0?
      Object.values(posts).map((post)=>
       <Post clickHandler={this.voteHandler} handleAction={this.handleAction}  key={post.id} post={post} />
    ):<div>No posts found</div>

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
                  <a onClick={()=>{this.toogleState(); this.setState({post:{}});}}>
                    What do you have in mind?
                  </a>
                </h2>
              </div>
              {
                this.state.visible && <NewPost post={this.state.post} close={this.toogleState}/>
              }
              <div>
                {match.path!=='/' && match.params.category? `Home > ${this.getCategoryFromPath(match.params.category)}`:'Home'}
              </div>
              <div className="sortby">
                  Sort by:&nbsp;
                  <input defaultChecked onClick={(e)=>{this.handleAction(e,"date","sortby")}} type="radio" value="Date" name="sortby" />Date
                  &nbsp;
                  <input onClick={(e)=>{this.handleAction(e,"score","sortby")}} type="radio" value="Score" name="sortby" />Score
              </div>
              <h1>Posts:</h1>

              {
                postList
              }
            </div>
            <div className="l-box pure-u-1 pure-u-md-1-6 pure-u-lg-1-5">
              <UserList clickHandler={this.setCurrentUser} list={users} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  let posts = Object.values(state.posts.list).map(
    e=> {
      return {
        ...e,
        ['initials']: state.users.list[e.author].initials,
        ['canEdit']: e.author === state.users.current
      }
    }
  );

  if(isEmpty(state.posts.order)||state.posts.order==='date'){
    posts = orderBy(posts,['timestamp'],['desc']);
  }else{
    posts = orderBy(posts,['voteScore'],['desc']);
  }

  const path = location.pathname.replace('/','');
  if(!isEmpty(path)){
    posts = posts.filter(f=>f.path===path);
  }

  return {
    user:state.users.list[state.users.current],
    posts:posts,
    users:state.users.list,
    categories:state.categories.list
  }
}

export default connect(mapStateToProps)(Home);
