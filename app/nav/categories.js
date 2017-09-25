import React from 'react';
import PropTypes from 'prop-types'

export default class Categories extends React.Component {
  render() {
    return (
      <div>
        Categories
        <hr />
        <ul>
          <li>
            <a href="#">Philosophy</a>
          </li>
          <li>
            <a href="#">What Are The Best Photographs of?</a>
          </li>
          <li>
            <a href="#">Suspendisse sodales</a>
          </li>
          <li>
            <a href="#">Pellentesque elementum</a>
          </li>
          <li>
            <a href="#">Other</a>
          </li>
          <li>
            <a href="#">eee</a>
          </li>
        </ul>
      </div>
    );
  }
}

Categories.propTypes = {
};
