import React from 'react';
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import Guid from 'guid'

import {saveNewComment} from './detail.actions'
import Badge from '../shared/badge.component'

class NewComment extends React.Component {
  constructor(props){
      super(props);
      this.state={
        body:''
      };
      this.handleChange = this.handleChange.bind(this);
      this.saveHandler = this.saveHandler.bind(this);
  }

  handleChange(e,control){
      this.setState({
        [control]:e.target.value
      })
  }

  validateForm(){
    return !(this.state.body==='')
  }

  saveHandler(e){
    if(this.validateForm()){
      const comment = {
        id:Guid.raw(),
        timestamp:+ new Date,
        author: this.props.currentUser,
        parentId:this.props.parentId,
        parentCommentId:this.props.commentId,
        ...this.state
      }

      this.props.dispatch(saveNewComment(comment));
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
            <textarea value={this.state.body} required onChange={(e)=>this.handleChange(e, 'body')}>
            </textarea>
            {this.state.body==='' && <span className="warning">*Comment required</span>}

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
