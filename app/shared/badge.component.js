import React from 'react';
import PropTypes from 'prop-types'

export default class Badge extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
  }

  render() {
    let {color,initials, name} = this.props;

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
    name:PropTypes.string.isRequired,
    color:PropTypes.string.isRequired
};
