import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash/collection';
import { isEmpty } from 'lodash/lang';
import { getCategories } from '../nav/category.actions.js';
import { setCurrentUser } from '../nav/user.actions';
import * as detailActions from './detail.actions';
import Categories from '../nav/category.component';
import UserList from '../nav/user.component';
import Post from '../post/post.component';
import Comment from './comment.component';
import NewComment from './new.component';
import NewPost from '../post/new.component';

class Detail extends React.Component {
  constructor(props, history) {
    super(props, history);
    this.toogleModal = this.toogleModal.bind(this);
    this.voteHandler = this.voteHandler.bind(this);
    this.setUser = this.setUser.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.toogleState = this.toogleState.bind(this);
    this.state = {
      visible: false,
      editVisible: false,
    };
  }

  componentDidMount() {
    const { match, categories, actions } = this.props;
    actions.getPostDetail(match.params.post_id);
    if (isEmpty(categories)) {
      actions.getCategories();
    }
  }

  setUser(userId) {
    this.props.actions.setCurrentUser(userId);
  }

  voteHandler(postId, option) {
    this.props.actions.votePostDetail(postId, option);
  }

  handleAction(e, value, action) {
    switch (action) {
      case 'edit':
        this.setState({
          post: value,
        });
        this.toogleState();
        break;
      case 'delete':
        if (confirm('Do you want to delete this post?')) { // eslint-disable-line no-alert
          this.props.actions.deleteCurrentPost(value.id);
          this.props.history.push('/');
        }
        break;
      default:
        break;
    }
  }

  toogleState() {
    this.setState({
      editVisible: !this.state.editVisible,
    });
  }

  toogleModal(comment, action) {
    if (!this.state.visible) {
      const { match, actions } = this.props;
      switch (action) {
        case 'reply':
          this.setState({
            visible: true,
            parentId: match.params.post_id,
            commentId: comment.id,
            comment: {},
          });
          break;
        case 'edit':
          this.setState({
            parentId: match.params.post_id,
            commentId: comment.id,
            visible: true,
            comment,
          });
          break;
        case 'new':
          this.setState({
            parentId: match.params.post_id,
            commentId: null,
            visible: true,
            comment: {},
          });
          break;
        case 'delete':
          actions.deleteCurrentComment(comment.id);
          break;
        case 'upVote':
          actions.voteNewComment(comment, 'upVote');
          break;
        case 'downVote':
          actions.voteNewComment(comment, 'downVote');
          break;
        default:
          break;

      }
    } else {
      this.setState({
        visible: false,
        parentId: null,
        commentId: null,
      });
    }
  }

  render() {
    const { users, categories, post, comments } = this.props;
    const list = comments.length > 0 ?
      comments.map((comment) =>
        <Comment
          handler={this.toogleModal}
          key={comment.id} canEdit={comment.author === this.props.currentUser}
          user={users[comment.author]} comment={comment}
        />
    ) : <div>No comments found</div>;
    const notFound = post.fetched && !post.hasOwnProperty('id');
    return notFound ? (
      <div className="content-wrapper">
        <div className="content">Post not found</div>
      </div>) :
    (<div className="content-wrapper">
      <div className="content">
        <div className="pure-g">
          <div className="l-box pure-u-1 pure-u-md-1-6 pure-u-lg-1-5">
            <Categories list={categories} />
          </div>
          <div className="l-box pure-u-1 pure-u-md-2-6 pure-u-lg-3-5">
            <Post clickHandler={this.voteHandler} handleAction={this.handleAction} key={post.id} post={post} />
            <div>
                List of comments:
                  <a
                    className="pure-button pure-button-primary align-right"
                    onClick={() => this.toogleModal(null, 'new')}
                  >Add comment</a>
              {list}
            </div>

          </div>
          <div className="l-box pure-u-1 pure-u-md-1-6 pure-u-lg-1-5">
            <UserList clickHandler={this.setUser} list={users} />
          </div>
        </div>
      </div>
      {
        this.state.editVisible && (
          <NewPost location="detail" post={this.state.post} close={this.toogleState} />
        )
      }
      {
          this.state.visible && (
            <NewComment
              comment={this.state.comment} parentId={this.state.parentId}
              commentId={this.state.commentId} close={this.toogleModal}
            />)
        }
    </div>
    );
  }
}

function mapStateToProps(state) {
  state.posts.comments.forEach(e => {
    if (e.parentCommentId === null) {
      e.parentCommentId = e.id;
    }
  });

  const detail = !isEmpty(state.posts.detail.id) ? {
    ...state.posts.detail,
    initials: state.users.list[state.posts.detail.author].initials,
    canEdit: state.posts.detail.author === state.users.current,
  } : { ...state.posts.detail };
  const orderedComments = sortBy(state.posts.comments, (e) => e.parentCommentId);
  detail.comments = orderedComments.length;


  return {
    post: detail,
    comments: orderedComments,
    users: state.users.list,
    categories: state.categories.list,
    currentUser: state.users.current,
  };
}

Detail.propTypes = {
  post: PropTypes.object,
  comments: PropTypes.array,
  users: PropTypes.object,
  categories: PropTypes.array,
  currentUser: PropTypes.string,
  match: PropTypes.object,
  actions: PropTypes.object,
  history: PropTypes.object,
};


function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ ...detailActions, setCurrentUser, getCategories }, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
