import React from 'react';
import styles from './navbar.module.css';
import { NavLink } from 'react-router-dom';
import LogOut from 'Components/Auth/LogOut';

const Navbar = (props) => {
  const token = sessionStorage.getItem('token');
  return (
    <nav className={styles.navbar}>
      <ul className={styles.rutes}>
        {props.routes.map((route) => (
          <li className={!token ? styles.homeButtons : styles.anchor} key={route.name}>
            <NavLink
              to={route.path}
              className={!token ? styles.navbarLinkButtons : styles.navbarLink}
              activeClassName={styles.active}
              data-testid="home-btn"
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/${route.icon}`}
                alt={`icon ${route.name} `}
              />
              {route.name}
            </NavLink>
          </li>
        ))}
      </ul>
      {!!token && <LogOut />}
    </nav>
  );
};

export default Navbar;
