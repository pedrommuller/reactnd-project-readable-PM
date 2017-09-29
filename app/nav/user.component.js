import React from 'react'
import PropTypes from 'prop-types'
import Badge from '../shared/badge.component'

export default class UserList extends React.Component {
  render() {
    const {list} = this.props;
    return (
      <div>
        Select user:
        <hr />
        <ul className="no-bullet">
          {
            Object.values(list).map((e)=>
                <li key={e.initials+e.name}>
                  <Badge
                    color={e.color}
                    initials={e.initials}
                    name={e.name} />
                </li>
            )
          }
        </ul>
      </div>
    );
  }
}

UserList.PropTypes={
  list:PropTypes.object.isRequired
}
