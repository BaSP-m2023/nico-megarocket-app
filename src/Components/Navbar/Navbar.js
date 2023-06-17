import React from 'react';
import styles from './navbar.module.css';
import { NavLink, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const member = `${process.env.PUBLIC_URL}/assets/images/member.png`;
const home = `${process.env.PUBLIC_URL}/assets/images/home.png`;
const hombeB = `${process.env.PUBLIC_URL}/assets/images/HomeB.png`;
const trainer = `${process.env.PUBLIC_URL}/assets/images/trainer.png`;
const classs = `${process.env.PUBLIC_URL}/assets/images/class.png`;
const suscription = `${process.env.PUBLIC_URL}/assets/images/suscription.png`;
const members = `${process.env.PUBLIC_URL}/assets/images/muscle.png`;
const activities = `${process.env.PUBLIC_URL}/assets/images/runner.png`;
const login = `${process.env.PUBLIC_URL}/assets/images/login.png`;

export const Navbar = () => {
  const house = useLocation().pathname;

  return (
    <nav className={styles.navbar}>
      <ul className={styles.rutes}>
        {house.includes('/home') && (
          <>
            <li className={styles.homeButtons}>
              <NavLink to="/home" className={styles.navbarLinkButtons}>
                <img src={hombeB} alt="icon home" />
                Home
              </NavLink>
            </li>
            <li className={styles.homeButtons}>
              <NavLink to="/admin" className={styles.navbarLinkButtons}>
                <img src={login} alt="icon login" />
                Admins
              </NavLink>
            </li>
            <li className={styles.homeButtons}>
              <NavLink to="/member" className={styles.navbarLinkButtons}>
                <img src={login} alt="icon login" />
                Members
              </NavLink>
            </li>
          </>
        )}
        {house.startsWith('/admin') && (
          <>
            <li className={styles.anchor}>
              <NavLink to="/home" className={styles.navbarLink} activeClassName={styles.active}>
                <img src={home} alt="icon home" />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/classes"
                className={styles.navbarLink}
                activeClassName={styles.active}
              >
                <img src={classs} alt="icon class" />
                Classes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/trainers"
                className={styles.navbarLink}
                activeClassName={styles.active}
              >
                <img src={trainer} alt="icon trainer" />
                Trainers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/activities"
                className={styles.navbarLink}
                activeClassName={styles.active}
              >
                <img src={activities} alt="icon activities" />
                Activities
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/subscriptions"
                className={styles.navbarLink}
                activeClassName={styles.active}
              >
                <img src={suscription} alt="icon suscription" />
                Subscriptions
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/members"
                className={styles.navbarLink}
                activeClassName={styles.active}
              >
                <img src={members} alt="icon member" />
                Members
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/profile"
                className={styles.navbarLink}
                activeClassName={styles.active}
              >
                <img src={member} alt="icon member" />
                Profile
              </NavLink>
            </li>
          </>
        )}
        {house.startsWith('/member') && (
          <>
            <li className={styles.anchor}>
              <NavLink to="/home" className={styles.navbarLink} activeClassName={styles.active}>
                <img src={home} alt="icon home" />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/member/classes"
                className={styles.navbarLink}
                activeClassName={styles.active}
              >
                <img src={classs} alt="icon class" />
                Classes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/member/activities"
                className={styles.navbarLink}
                activeClassName={styles.active}
              >
                <img src={activities} alt="icon activities" />
                Activities
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/member/profile"
                className={styles.navbarLink}
                activeClassName={styles.active}
              >
                <img src={member} alt="icon member" />
                Profile
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
