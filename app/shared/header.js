import React from 'react'
import logo from 'images/logo-readable-2.png'
import {FaHome,FaPencil, FaUser} from 'react-icons/lib/fa'

const Header = ()=>
(
  <div className="header">
    <div className="home-menu pure-menu pure-menu-horizontal">
      <a href="">
        <img src={logo} alt="logo" className="home-logo" />
      </a>

      <ul className="pure-menu-list">
          <li className="pure-menu-item pure-menu-selected">
            <a href="#" className="pure-menu-link">
              <FaHome size="24" />
              Home
            </a>
          </li>
          <li className="pure-menu-item">
            <a href="#" className="pure-menu-link">
              <FaPencil alt="New Post" size="24" />
              New Post
            </a>
          </li>
          <li className="pure-menu-item">
            <a href="#" className="pure-menu-link">
              <FaUser size="24" alt="User" />John Doe
            </a>
          </li>
      </ul>
    </div>
  </div>
);

export default Header
