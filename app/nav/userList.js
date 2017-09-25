import React from 'react'
import PropTypes from 'prop-types'
import Badge from '../shared/badge'

export default class UserList extends React.Component {
  render() {
    return (
      <div>
        Select user:
        <hr />
        <ul className="no-bullet">
          <li>
            <Badge initials="JH" name="James Herfield" />
          </li>
          <li>
            <Badge initials="LU" name="Lars Urlich" />
          </li>
          <li>
            <Badge initials="KH" name="Kirck Hammet" />
          </li>
          <li>
            <Badge initials="RT" name="Robert Trujillo" />
          </li>
        </ul>
      </div>
    );
  }
}

UserList.propTypes = {
};
