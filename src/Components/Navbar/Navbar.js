import React from 'react';
import styles from './navbar.module.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.rutes}>
        <li className={styles.anchor}>
          <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : 'nav-item')}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/activities">Activities</NavLink>
        </li>
        <li>
          <NavLink to="/admins">Admins</NavLink>
        </li>
        <li>
          <NavLink to="/classes">Classes</NavLink>
        </li>
        <li>
          <NavLink to="/members">Members</NavLink>
        </li>
        <li>
          <NavLink to="/subscriptions">Subscriptions</NavLink>
        </li>
        <li>
          <NavLink to="/super-admins">Super Admins</NavLink>
        </li>
        <li>
          <NavLink to="/trainers">Trainers</NavLink>
        </li>
      </ul>
    </nav>
  );
};
