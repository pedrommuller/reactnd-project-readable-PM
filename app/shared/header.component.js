import React from 'react'
import {connect} from 'react-redux'

import logo from 'images/logo-readable-2.png'
import {FaHome} from 'react-icons/lib/fa'

import Badge from '../shared/badge.component.js'

const Header = (props)=>
(
  <div className="header">
    <div className="home-menu pure-menu pure-menu-horizontal">
      <img src={logo} alt="logo" className="home-logo" />

      <ul className="pure-menu-list">
          <li className="pure-menu-item">
            <Badge color={props.user.color} initials={props.user.initials} name="" />
          </li>
      </ul>
    </div>
  </div>
);

function mapStateToProps(state){
  return {
    user:state.users.list[state.users.current],
  }
}

export default connect(mapStateToProps)(Header);
