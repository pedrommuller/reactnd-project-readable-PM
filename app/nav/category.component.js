import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const Categories = (props)=>(
  <div>
    Categories
    <hr />
    <ul>
      {
          props.list.map((e)=>
          <li key={e.path}>
            <Link to={{pathname:`/${e.path}`,state:{routeType:'category'}}}>{e.name}</Link>
          </li>
        )
      }
    </ul>
  </div>
);

export default Categories;

Categories.propTypes = {
  list:PropTypes.array.isRequired
};
