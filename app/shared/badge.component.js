import React from 'react';
import PropTypes from 'prop-types'

export default class Badge extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
  }

  render() {
    const {color,initials, name, className,id} = this.props;
    return (
      <div className={className}>
        <div className="badge-wrapper">
          <div style={{'backgroundColor': color}} className="badge">
            {
              initials.toUpperCase()
            }
          </div>
        </div>
        <a href="#" onClick={(e)=>{this.props.clickHandler?this.props.clickHandler(id):e.preventDefault()}}>{name}</a>
      </div>
    );
  }

}

Badge.propTypes = {
    initials: PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
    color:PropTypes.string.isRequired
};
