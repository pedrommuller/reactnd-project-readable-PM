import React from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import Badge from '../shared/badge.component'
import ReplyIcon from './reply.icon'
import EditIcon from './edit.icon'


const Comment = (props) =>{
  const className = props.comment.parentCommentId ==props.comment.id?"comment":"reply";
  return (<div className={className}>
    <Badge className="comment-badge"
          color={props.user.color}
          initials={props.user.initials}
          name={props.user.name} />
    <div className="align-left comment-body">
      {props.comment.body}
    </div>
    <br />
     <div className="comment-body">
       <TimeAgo date={props.comment.timestamp} />,
       &nbsp; {props.comment.voteScore} votes &nbsp;&nbsp;
       {
         className==='comment' &&
         <div>
           <ReplyIcon />
           <a onClick={(e)=>props.handler(props.comment,'reply')}>[Reply]</a>
         </div>
       }
       {
         props.canEdit && <div>
           &nbsp;
           <EditIcon />
           <a onClick={(e)=>props.handler(props.comment,'edit')}>[Edit]</a>
         </div>
       }

     </div>
  </div>)
}


export default Comment;

Comment.propTypes = {
  canEdit: PropTypes.bool.isRequired,
  comment: PropTypes.object.isRequired,
  user:PropTypes.object.isRequired,
  handler:PropTypes.func.isRequired
};
