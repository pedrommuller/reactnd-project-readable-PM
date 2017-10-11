import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

const Categories = (props) => (<div>
    Categories
    {
      props.router.location &&
      props.router.location.pathname !== '/' &&
      <Link to={{ pathname: '/', state: { routeType: 'category' } }}>[Clear]</Link>
    }
  <hr />
  <ul>
    {
          props.list.map((e) =>
            <li key={e.path}>
              <NavLink
                activeStyle={{ fontWeight: 'bold', fontSize: '1.1em' }}
                to={{ pathname: `/${e.path}`, state: { routeType: 'category' } }}
              >{e.name}
              </NavLink>
            </li>
        )
      }
  </ul>
</div>);


export default connect((state) => state)(Categories);

Categories.propTypes = {
  list: PropTypes.array.isRequired,
  router: PropTypes.object,
};
