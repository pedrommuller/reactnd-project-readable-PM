import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Guid from 'guid'

import {saveNewPost} from './post.actions'
import Badge from '../shared/badge.component'

class New extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
    this.postQuestion = this.postQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.state ={
      category:'',
      path:'',
      body:'',
      title:''
    }
  }

  validateForm(){
    return !(
      this.state.body==='' ||
      this.state.title==='' ||
      this.state.category==='')
  }

  postQuestion(){
    if(this.validateForm()){
      const post = {
        id:Guid.raw(),
        timestamp:+new Date(),
        author: this.props.currentUser,
        ...this.state
      }
      this.props.dispatch(saveNewPost(post));
      this.props.close();
      this.setState({
        category:'',
        path:'',
        body:'',
        title:''
      });
    }
  }

  handleChange(e, control){
    if(control==='category'){
      const {options, selectedIndex} = e.target;
      if(options[selectedIndex].value===''){
        this.setState({
          category:'',
          path:''
        })
      }else{
        this.setState({
          category:options[selectedIndex].text,
          path:options[selectedIndex].value
        })
      }

    }else{
      this.setState({
        [control]:e.target.value
      })
    }

  }

  render() {
    const {visible,user, categories} = this.props;
    const style ={};
    style.display = visible?'block':'none';

    return (
      <div id="myModal" style={style} className="modal">
        <div className="modal-content">
          <span onClick={this.props.close} className="close">&times;</span>
          <Badge color={user.color} initials={user.initials} name={user.name} />
          <p>
            {this.state.title ==='' && <span className="warning">*Title required</span>}
            <input type="text" value={this.state.title} placeholder="What do you have in mind?"
              onChange={(e)=>this.handleChange(e,'title')} />
            {this.state.body==='' && <span className="warning">*Description required</span>}
            <textarea value={this.state.body} onChange={(e)=>this.handleChange(e,'body')}>
            </textarea>
            {this.state.category==='' && <span className="warning">*Category required</span>}
            <select value={this.state.path} onChange={(e)=>this.handleChange(e,'category')}>
              <option value="" key="1"> - Select -</option>
              {categories.map((e)=><option key={e.path} value={e.path}>{e.name}</option>)}
            </select>
            <a onClick={(e)=>this.postQuestion(e)} className="pure-button pure-button-primary align-right">
              Post question
            </a>
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user:state.users.list[state.users.current],
    currentUser:state.users.current,
    categories:state.categories.list
  }
}

export default connect(mapStateToProps)(New);

New.PropTypes = {
  close: PropTypes.func.isRequired
};
