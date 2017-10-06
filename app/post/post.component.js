import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import TimeAgo from 'react-timeago'

import ArrowUpIcon from './ArrowUp.icon'
import ArrowDownIcon from './ArrowDown.icon'
import CommentIcon from './Comment.icon'

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
        <span className="question-category">
          {props.post.category}
        </span>
      </div>
      <div className="pure-u-1-5">
        <span className="question-info">
          Posted by <a href="#">{props.post.author}</a>,<br />
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
