import React from 'react';
import PropTypes from 'prop-types'

export default class Badge extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
  }

  render() {
    let {color,initials, name} = this.props;
    if(!color){
      color = '#'+Math.floor(Math.random()*16777215).toString(16)
    }

    return (
      <div>
        <div className="badge-wrapper">
          <div style={{'backgroundColor': color}} className="badge">
            {
              initials.toUpperCase()
            }
          </div>
        </div>
        <a href="#">{name}</a>
      </div>
    );
  }
}

Badge.propTypes = {
    initials: PropTypes.string.isRequired,
    name:PropTypes.string.isRequired
};
