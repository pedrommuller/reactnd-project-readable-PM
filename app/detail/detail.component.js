import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {sortBy} from 'lodash/collection'

import {getPostDetail} from './detail.actions'
import Categories from '../nav/category.component'
import UserList from '../nav/user.component'
import Post from '../post/post.component'
import Badge from '../shared/badge.component'
import Comment from './comment.component'
import NewComment from './new.component'

class Detail extends React.Component {
  constructor(props){
    super(props);
    this.toogleModal = this.toogleModal.bind(this);
    this.state = {
      visible:false
    };
  }

  componentDidMount(){
    const {match} = this.props;
    this.props.dispatch(
      getPostDetail(match.params.post_id)
    );
  }

  toogleModal(commentId){
    if(!this.state.visible){
      const {match} = this.props;
      this.setState({
        visible:true,
        parentId:match.params.post_id,
        commentId:commentId
      });
    }else{
      this.setState({
        visible:false,
        parentId:null,
        commentId:null
      });
    }
  }


  render() {
    const {users, categories, post, comments} = this.props;
    const list = comments.length>0?
      comments.map((comment)=>
       <Comment handler={this.toogleModal}
         key={comment.id} user={users[comment.author]} comment={comment} />
    ):<div>No comments found</div>

    return (
      <div className="content-wrapper">
        <div className="content">
          <div className="pure-g">
            <div className="l-box pure-u-1 pure-u-md-1-6 pure-u-lg-1-5">
              <Categories list={categories} />
            </div>
            <div className="l-box pure-u-1 pure-u-md-2-6 pure-u-lg-3-5">
              <Post key={post.id} post={post} />
              <div>
                List of comments:
                  <a className="pure-button pure-button-primary align-right"
                    onClick={(e)=>this.toogleModal(null)}>Add comment</a>
                {list}
              </div>

            </div>
            <div className="l-box pure-u-1 pure-u-md-1-6 pure-u-lg-1-5">
              <UserList list={users} />
            </div>
          </div>
        </div>
        {
          this.state.visible && (<NewComment parentId={this.state.parentId} commentId={this.state.commentId}
            close={this.toogleModal} />)
        }
      </div>
    );
  }
}


function mapStateToProps(state){

  state.posts.comments.forEach(e=>{
    if(e.parentCommentId===null){
      e.parentCommentId = e.id;
    }
  })

  const orderedComments =
  sortBy(state.posts.comments,['parentCommentId','timestamp'],['asc','desc']);

  const detail = {...state.posts.detail};
  detail.comments = orderedComments.length;

  return {
    post:detail,
    comments: orderedComments,
    users:state.users.list,
    categories:state.categories.list
  }
}


export default connect(mapStateToProps)(Detail);


Detail.propTypes = {
};
