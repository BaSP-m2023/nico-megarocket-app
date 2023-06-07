import React from 'react';
import styles from './navbar.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.rutes}>
        <li className={styles.anchor}>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/activities">Activities</Link>
        </li>
        <li>
          <Link to="/admins">Admins</Link>
        </li>
        <li>
          <Link to="/classes">Classes</Link>
        </li>
        <li>
          <Link to="/members">Members</Link>
        </li>
        <li>
          <Link to="/subscriptions">Subscriptions</Link>
        </li>
        <li>
          <Link to="/super-admins">Super Admins</Link>
        </li>
        <li>
          <Link to="/trainers">Trainers</Link>
        </li>
      </ul>
    </nav>
  );
};
