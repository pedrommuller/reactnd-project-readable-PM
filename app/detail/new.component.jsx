import React from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash/lang';
import Guid from 'guid';
import * as actions from './detail.actions';
import Badge from '../shared/badge.component';

class NewComment extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
    if (!isEmpty(props.comment)) {
      this.state = {
        comment: props.comment,
      };
    } else {
      this.state = {
        comment: {
          body: '',
        },
      };
    }
  }

  handleChange(e, control) {
    this.setState({
      comment: {
        [control]: e.target.value,
      },
    });
  }

  validateForm() {
    return !(this.state.body === '');
  }

  saveHandler() {
    if (this.validateForm()) {
      let comment = {};
      if (isEmpty(this.props.comment)) {
        comment = {
          id: Guid.raw(),
          timestamp: +new Date(),
          author: this.props.currentUser,
          parentId: this.props.parentId,
          parentCommentId: this.props.commentId,
          body: this.state.comment.body,
        };
        this.props.actions.saveNewComment(comment);
      } else {
        comment = {
          id: this.props.comment.id,
          body: this.state.comment.body,
          timestamp: +new Date(),
          author: this.props.currentUser,
          parentId: this.props.parentId,
          parentCommentId: this.props.commentId,
        };
        this.props.actions.editCurrentComment(comment);
      }
      this.props.close();
    }
  }

  render() {
    const { user, close } = this.props;
    return (
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span onClick={close} className="close">&times;</span>
          <Badge color={user.color} initials={user.initials} name={user.name} />
          <p>
            <textarea
              value={this.state.comment.body} required
              onChange={(e) => this.handleChange(e, 'body')}
            />
            {this.state.comment.body === '' && <span className="warning">*Comment required</span>}

            <a
              onClick={(e) => this.saveHandler(e)}
              className="pure-button pure-button-primary align-right"
            >
              {
                isEmpty(this.props.comment) ? <span>Post Comment</span> : <span>Edit Comment</span>
              }
            </a>

            <br />
          </p>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ ...actions }, dispatch) };
}

function mapStateToProps(state) {
  return {
    user: state.users.list[state.users.current],
    currentUser: state.users.current,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewComment);

NewComment.propTypes = {
  close: PropTypes.func.isRequired,
  comment: PropTypes.object,
  currentUser: PropTypes.string,
  user: PropTypes.object,
  parentId: PropTypes.string,
  commentId: PropTypes.string,
  actions: PropTypes.object,
};
