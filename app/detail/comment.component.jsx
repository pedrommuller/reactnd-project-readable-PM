import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import Badge from '../shared/badge.component';
import ReplyIcon from './icons/reply.icon';
import EditIcon from './icons/edit.icon';
import UpVoteIcon from './icons/upvote.icon';
import DownVoteIcon from './icons/downvote.icon';
import DeleteIcon from './icons/delete.icon';

const Comment = (props) => {
  const className = props.comment.parentCommentId === props.comment.id ?
  'comment' : 'reply';
  return (
    <div className={className}>
      <Badge
        className="comment-badge"
        color={props.user.color}
        initials={props.user.initials}
        name={props.user.name}
      />

      <div className="align-left comment-body">
        {props.comment.body}
      </div>
      <br />
      <div className="comment-body">
        <TimeAgo date={props.comment.timestamp} />
        {
         className === 'comment' &&
         <div className="comment-icons" >
           <ReplyIcon className="comment-icons" />
           <a onClick={() => props.handler(props.comment, 'reply')}>[Reply]</a>
         </div>
       }
        {
         props.canEdit &&
         <div className="comment-icons" >
           <EditIcon />
           <a onClick={() => props.handler(props.comment, 'edit')}>[Edit]</a>
           <DeleteIcon />
           <a onClick={() => props.handler(props.comment, 'delete')}>[Delete]</a>
         </div>
       }


        <div className="comment-icons" >
          <a onClick={() => props.handler(props.comment.id, 'upVote')}>
            <UpVoteIcon />
          </a>
          <a onClick={() => props.handler(props.comment.id, 'downVote')}>
            <DownVoteIcon className="comment-downVote" />
          </a>
        </div>
        <div>
          {props.comment.voteScore} votes
         </div>

      </div>
    </div>);
};

export default Comment;

Comment.propTypes = {
  canEdit: PropTypes.bool.isRequired,
  comment: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handler: PropTypes.func.isRequired,
};
