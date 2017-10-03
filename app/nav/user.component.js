import React from 'react'
import PropTypes from 'prop-types'
import Badge from '../shared/badge.component'

const UserList = (props)=>(
  <div>
      Select user:
      <hr />
      <ul className="no-bullet">
        {
          Object.values(props.list).map((e)=>
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

export default UserList;

UserList.PropTypes={
  list:PropTypes.object.isRequired
}
