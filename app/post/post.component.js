import React from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'

import IconArrowUp from './iconArrowUp'
import IconArrowDown from './IconArrowDown'
import Comments from './IconComment'


export default class Post extends React.Component {
  render() {
    const {post} = this.props;
    return (
      <div className="l-box box">
          <div className="pure-u-1-5 ">
            <div className="question-arrows">
              <IconArrowUp />
              <br/>
              <IconArrowDown />
            </div>
            <div className="question-vote">
              {post.voteScore} <br />
              votes
            </div>
          </div>
          <div className="pure-u-3-5">
            <span className="question-title">
                {post.title}
            </span><br/>
            <span className="question-body">
              {post.body}
            </span>
            <span className="question-category">
              {post.category}
            </span>
          </div>
          <div className="pure-u-1-5">
            <span className="question-info">
              Posted by <a href="#">{post.author}</a>,<br />
              <TimeAgo date={post.timestamp} />
            </span>
            <span className="question-comments">
              <Comments /> <span>Comments: {post.comments}</span>
            </span>
          </div>
      </div>
    );
  }
}


Post.propTypes = {
  post:PropTypes.object.isRequired
};
