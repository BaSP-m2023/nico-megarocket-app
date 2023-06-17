import React from 'react';
import styles from './navbar.module.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const member = `${process.env.PUBLIC_URL}/assets/images/member.png`;
const home = `${process.env.PUBLIC_URL}/assets/images/home.png`;
const admin = `${process.env.PUBLIC_URL}/assets/images/admin.png`;
const trainer = `${process.env.PUBLIC_URL}/assets/images/trainer.png`;
const classs = `${process.env.PUBLIC_URL}/assets/images/class.png`;
const suscription = `${process.env.PUBLIC_URL}/assets/images/suscription.png`;
const members = `${process.env.PUBLIC_URL}/assets/images/muscle.png`;
const activities = `${process.env.PUBLIC_URL}/assets/images/runner.png`;

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.rutes}>
        <li className={styles.anchor}>
          <NavLink to="/home" className={styles.navbarLink} activeClassName={styles.active}>
            <img src={home} alt="icon home" />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/admins" className={styles.navbarLink} activeClassName={styles.active}>
            <img src={admin} alt="icon admin" className={styles.members} />
            Admins
          </NavLink>
        </li>
        <li>
          <NavLink to="/members" className={styles.navbarLink} activeClassName={styles.active}>
            <img src={members} alt="icon member" />
            Members
          </NavLink>
        </li>
        <li>
          <NavLink to="/activities" className={styles.navbarLink} activeClassName={styles.active}>
            <img src={activities} alt="icon activities" />
            Activities
          </NavLink>
        </li>
        <li>
          <NavLink to="/classes" className={styles.navbarLink} activeClassName={styles.active}>
            <img src={classs} alt="icon class" />
            Classes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/subscriptions"
            className={styles.navbarLink}
            activeClassName={styles.active}
          >
            <img src={suscription} alt="icon suscription" />
            Subscriptions
          </NavLink>
        </li>
        <li>
          <NavLink to="/super-admins" className={styles.navbarLink} activeClassName={styles.active}>
            <img src={member} alt="icon superadmin" /> SuperAdmins
          </NavLink>
        </li>
        <li>
          <NavLink to="/trainers" className={styles.navbarLink} activeClassName={styles.active}>
            <img src={trainer} alt="icon trainer" />
            Trainers
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
