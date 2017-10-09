import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import TimeAgo from 'react-timeago'

import ArrowUpIcon from './ArrowUp.icon'
import ArrowDownIcon from './ArrowDown.icon'
import CommentIcon from './Comment.icon'
import EditIcon from './edit.icon'
import BinIcon from './bin.icon'

const Post = (props)=>(
  <div className="l-box box">
      <div className="pure-u-1-5 ">
        <div className="question-arrows">
          <ArrowUpIcon />
          <br/>
          <ArrowDownIcon />
        </div>
        <div className="question-vote">
          {props.post.voteScore} <br />
          votes
        </div>
      </div>
      <div className="pure-u-3-5">
        <span className="question-title">
          <Link to={`/${props.post.path}/${props.post.id}`} >{props.post.title}</Link>
        </span><br/>
        <span className="question-body">
          {props.post.body}
        </span>
        <div className="question-category">
          <span>
            {props.post.category}
          </span>
        </div>
        {
            props.post.canEdit &&
            (
              <div className="question-actions">
               <span>
                <EditIcon />&nbsp;<a onClick={(e)=>props.handleAction(e,props.post,'edit')}>Edit</a>
               </span>
               <span>
                 <BinIcon />&nbsp;<a onClick={(e)=>props.handleAction(e,props.post,'delete')}>Delete</a>
               </span>
              </div>
            )
        }


      </div>
      <div className="pure-u-1-5">
        <span className="question-info">
          Posted by <b>{props.post.initials}</b>,<br />
          <TimeAgo date={props.post.timestamp} />
        </span>
        <span className="question-comments">
          <CommentIcon /> <span>Comments: {props.post.comments}</span>
        </span>
      </div>
  </div>
);

export default Post;

Post.propTypes = {
  post:PropTypes.object.isRequired
};
