import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

export default class Categories extends React.Component {
  render() {
    return (
      <div>
        Categories
        <hr />
        <ul>
          {
            this.props.list.map((e)=>
              <li key={e.path}>
                <Link to={`/${e.path}`}>{e.name}</Link>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}

Categories.propTypes = {
  list:PropTypes.array.isRequired
};
