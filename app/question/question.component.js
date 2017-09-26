import React from 'react'
import PropTypes from 'prop-types'
import {FaAngleUp, FaAngleDown} from 'react-icons/lib/fa'

export default class Question extends React.Component {
  render() {
    return (
      <div className="l-box box">
          <div className="pure-u-1-5 ">
            <div className="question-arrows">
              <FaAngleUp size="24" />
              <br/>
              <FaAngleDown size="24" />
            </div>
            <div className="question-vote">
              10 <br />
              votes
            </div>
          </div>
          <div className="pure-u-3-5">
            <span className="question-title">
                How to add validation attribute conditionally based on other Model Property.
            </span><br/>
            <span className="question-body">
              Everyone says so after all.
            </span>

          </div>
          <div className="pure-u-1-5">
            <span className="question-info">
              Asked by <a href="#">John doe</a>,<br />
              10 mins ago.
            </span>
          </div>
      </div>
    );
  }
}


Question.propTypes = {
};
