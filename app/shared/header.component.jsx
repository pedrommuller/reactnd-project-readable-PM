import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from 'images/logo-readable-2.png';
import Badge from '../shared/badge.component';

const Header = (props) =>
(
  <div className="header">
    <div className="home-menu pure-menu pure-menu-horizontal">
      <Link to={{ pathname: '/', state: { routeType: 'home' } }}>
        <img src={logo} alt="logo" className="home-logo" />
      </Link>

      <ul className="pure-menu-list">
        <li className="pure-menu-item">
          <Badge color={props.user.color} initials={props.user.initials} name="" />
        </li>
      </ul>
    </div>
  </div>
);

function mapStateToProps(state) {
  return {
    user: state.users.list[state.users.current],
  };
}

Header.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps)(Header);
