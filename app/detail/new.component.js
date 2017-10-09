import React from 'react';
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import Guid from 'guid'
import {isEmpty} from 'lodash/lang'

import {saveNewComment,editCurrentComment} from './detail.actions'
import Badge from '../shared/badge.component'

class NewComment extends React.Component {
  constructor(props){
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.saveHandler = this.saveHandler.bind(this);
      if(!isEmpty(this.props.comment)){
        this.state = {
          comment:this.props.comment
        }
      }else{
        this.state ={
          comment:{
            body:''
          }
        }
      }
  }

  handleChange(e,control){
      this.setState({
        comment:{
          [control]:e.target.value
        }
      })
  }

  validateForm(){
    return !(this.state.body==='')
  }

  saveHandler(e){
    if(this.validateForm()){
      let comment ={};
      if(isEmpty(this.props.comment)){
        comment = {
          id:Guid.raw(),
          timestamp:+ new Date,
          author: this.props.currentUser,
          parentId:this.props.parentId,
          parentCommentId:this.props.commentId,
          body:this.state.comment.body
        }
        this.props.dispatch(saveNewComment(comment));
      }else{
        console.log(this.props);
        comment = {
          id:this.props.comment.id,
          body:this.state.comment.body,
          timestamp:+ new Date
        }
        this.props.dispatch(editCurrentComment(comment));
      }
      this.props.close();
    }
  }

  render() {
    const {user,close} = this.props;
    return (
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span onClick={close} className="close">&times;</span>
          <Badge color={user.color} initials={user.initials} name={user.name} />
          <p>
            <textarea value={this.state.comment.body} required
              onChange={(e)=>this.handleChange(e, 'body')}>
            </textarea>
            {this.state.comment.body==='' && <span className="warning">*Comment required</span>}

              <a onClick={(e)=>this.saveHandler(e)}
                className="pure-button pure-button-primary align-right">
                Post Comment
              </a>

            <br />
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user:state.users.list[state.users.current],
    currentUser:state.users.current
  }
}

export default connect(mapStateToProps)(NewComment);

NewComment.propTypes = {
  close: PropTypes.func.isRequired
};
