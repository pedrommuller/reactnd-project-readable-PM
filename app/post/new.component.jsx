import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash/lang';
import Guid from 'guid';
import * as actions from './post.actions';
import Badge from '../shared/badge.component';

class New extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.postQuestion = this.postQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    if (!isEmpty(props.post)) {
      this.state = {
        ...props.post,
      };
    } else {
      this.state = {
        category: '',
        path: '',
        body: '',
        title: '',
      };
    }
  }

  validateForm() {
    return !(
      this.state.body === '' ||
      this.state.title === '' ||
      this.state.category === '');
  }

  postQuestion() {
    if (this.validateForm()) {
      let post = {
        id: Guid.raw(),
        timestamp: +new Date(),
        author: this.props.currentUser,
        ...this.state,
      };
      if (!isEmpty(this.props.post)) {
        post = {
          id: this.props.post.id,
          timestamp: this.props.post.timestamp,
          ...this.state,
        };
        if (this.props.location === 'home') {
          this.props.actions.editCurrentPost(post);
        } else {
          this.props.actions.editPostDetail(post);
        }
      } else {
        this.props.actions.saveNewPost(post);
      }

      this.props.close();
    }
  }

  handleChange(e, control) {
    if (control === 'category') {
      const { options, selectedIndex } = e.target;
      if (options[selectedIndex].value === '') {
        this.setState({
          category: '',
          path: '',
        });
      } else {
        this.setState({
          category: options[selectedIndex].text,
          path: options[selectedIndex].value,
        });
      }
    } else {
      this.setState({
        [control]: e.target.value,
      });
    }
  }

  render() {
    const { user, categories } = this.props;
    return (
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span onClick={this.props.close} className="close">&times;</span>
          <Badge color={user.color} initials={user.initials} name={user.name} />
          <p>
            {this.state.title === '' && <span className="warning">*Title required</span>}
            <input
              type="text" value={this.state.title} placeholder="What do you have in mind?"
              onChange={(e) => this.handleChange(e, 'title')}
            />
            {this.state.body === '' && <span className="warning">*Description required</span>}
            <textarea value={this.state.body} onChange={(e) => this.handleChange(e, 'body')} />
            {this.state.category === '' && <span className="warning">*Category required</span>}
            <select value={this.state.path} onChange={(e) => this.handleChange(e, 'category')}>
              <option value="" key="1"> - Select -</option>
              {categories.map((e) => <option key={e.path} value={e.path}>{e.name}</option>)}
            </select>
            <a onClick={(e) => this.postQuestion(e)} className="pure-button pure-button-primary align-right">
              Post question
            </a>
          </p>
        </div>
      </div>
    );
  }
}

New.propTypes = {
  close: PropTypes.func.isRequired,
  post: PropTypes.object,
  currentUser: PropTypes.string,
  categories: PropTypes.array,
  user: PropTypes.object,
  actions: PropTypes.object,
  location: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ ...actions }, dispatch) };
}

function mapStateToProps(state) {
  return {
    user: state.users.list[state.users.current],
    currentUser: state.users.current,
    categories: state.categories.list,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(New);
