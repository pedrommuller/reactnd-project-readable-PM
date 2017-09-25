import React from 'react'
import PropTypes from 'prop-types'
import Badge from '../shared/badge'

export default class New extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
    this.postQuestion = this.postQuestion.bind(this);
    this.handleTextchange = this.handleTextchange.bind(this);
  }

  postQuestion(){
    alert('post question');
  }

  handleTextchange(e){
    console.log(e);
  }

  render() {
    const {visible} = this.props;
    const style ={};
    style.display = visible?'block':'none';

    return (
      <div id="myModal" style={style} className="modal">
        <div className="modal-content">
          <span onClick={this.props.close} className="close">&times;</span>
          <Badge initials="PM" name="Pedro Muller" />
          <p>
            <textarea onChange={(e)=>this.handleTextchange(e)}>
            </textarea>
            <a onClick={(e)=>this.postQuestion(e)} className="pure-button pure-button-primary align-right">
              Post question
            </a>
          </p>
        </div>
      </div>
    );
  }
}

New.PropTypes = {
  visible:PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};
