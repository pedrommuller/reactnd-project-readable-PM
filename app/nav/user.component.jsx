import React from 'react';
import PropTypes from 'prop-types';
import Badge from '../shared/badge.component';

const UserList = (props) => (
  <div>
      Select user:
      <hr />
    <ul className="no-bullet">
      {
          Object.values(props.list).map((e) =>
            <li key={e.initials + e.name}>
              <Badge
                id={e.id}
                color={e.color}
                initials={e.initials}
                name={e.name}
                clickHandler={props.clickHandler}
              />
            </li>
          )
        }
    </ul>
  </div>

);

UserList.propTypes = {
  list: PropTypes.object.isRequired,
  clickHandler: PropTypes.func,
};

export default UserList;
