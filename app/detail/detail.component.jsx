import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash/collection';
import { isEmpty } from 'lodash/lang';
import { getCategories } from '../nav/category.actions.js';
import { getPostDetail, votePostDetail, voteNewComment } from './detail.actions';
import { setCurrentUser } from '../nav/user.actions';
import Categories from '../nav/category.component';
import UserList from '../nav/user.component';
import Post from '../post/post.component';
import Comment from './comment.component';
import NewComment from './new.component';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.toogleModal = this.toogleModal.bind(this);
    this.voteHandler = this.voteHandler.bind(this);
    this.setUser = this.setUser.bind(this);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    if (isEmpty(this.props.categories)) {
      this.props.dispatch(getCategories());
    }

    const { match } = this.props;
    this.props.dispatch(
      getPostDetail(match.params.post_id)
    );
  }

  voteHandler(postId, option) {
    this.props.dispatch(
      votePostDetail(postId, option)
    );
  }

  setUser(userId) {
    this.props.dispatch(setCurrentUser(userId));
  }

  toogleModal(comment, action) {
    if (!this.state.visible) {
      const { match } = this.props;
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
        case 'upVote':
          this.props.dispatch(voteNewComment(comment, 'upVote'));
          break;
        case 'downVote':
          this.props.dispatch(voteNewComment(comment, 'downVote'));
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

    return (
      <div className="content-wrapper">
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

  const detail = !isEmpty(state.posts.detail) ? {
    ...state.posts.detail,
    initials: state.users.list[state.posts.detail.author].initials,
    canEdit: false,
  } : {};
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
  dispatch: PropTypes.func,
  match: PropTypes.object,
};

export default connect(mapStateToProps)(Detail);
