import React, { useState } from 'react';
import styles from './navbar.module.css';
import { NavLink } from 'react-router-dom';
import LogOut from 'Components/Auth/LogOut';

const Navbar = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const token = sessionStorage.getItem('token');
  const currentPath = window.location.pathname;
  const shouldApplyHomeButtonStyle =
    currentPath === '/auth' ||
    currentPath === '/auth/login' ||
    currentPath === '/auth/sign-up' ||
    currentPath === '/auth/recover-password';

  return (
    <nav
      className={styles.navbar}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ul className={styles.rutes}>
        {props.routes.map((route) => (
          <li
            className={shouldApplyHomeButtonStyle ? styles.homeButtons : styles.anchor}
            key={route.name}
          >
            <NavLink
              to={route.path}
              className={styles.navbarLink}
              activeClassName={styles.active}
              data-testid="home-btn"
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/${route.icon}`}
                alt={`icon ${route.name} `}
                className={styles.navIcon}
              />
              <span>{route.name}</span>
            </NavLink>
          </li>
        ))}
        {!!token && <LogOut isHovered={isHovered} />}
      </ul>
    </nav>
  );
};

export default Navbar;
