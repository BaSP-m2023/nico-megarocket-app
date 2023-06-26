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
const mail = `${process.env.PUBLIC_URL}/assets/images/mail.png`;
const phone = `${process.env.PUBLIC_URL}/assets/images/phone.png`;

const Navbar = () => {
  const house = useLocation().pathname;

  return (
    <nav className={styles.navbar}>
      <ul className={styles.rutes}>
        {house.includes('/home') && (
          <>
            <li className={styles.homeButtons}>
              <NavLink to="/home" className={styles.navbarLinkButtons} data-testid="home-btn">
                <img src={hombeB} alt="icon home" />
                Home
              </NavLink>
            </li>
            <li className={styles.homeButtons}>
              <NavLink to="/admin" className={styles.navbarLinkButtons} data-testid="admin-btn">
                <img src={login} alt="icon login" />
                Admins
              </NavLink>
            </li>
            <li className={styles.homeButtons}>
              <NavLink to="/member" className={styles.navbarLinkButtons} data-testid="member-btn">
                <img src={login} alt="icon login" />
                Members
              </NavLink>
            </li>
            <div className={styles.containerContactInformation}>
              <h5>Contact information</h5>
              <a href="mailto:RocketGym@RRA.com">
                <img src={mail} alt="icon mail" /> @RocketGym
              </a>
              <a href="tel:000 000-0000" target="_blank" rel="noreferrer">
                <img src={phone} alt="icon phone" /> (000) 000-0000
              </a>
              <a
                href="https://www.google.com/maps/place/Pl.+Independencia,+Montevideo,+Departamento+de+Montevideo"
                target="_blank"
                rel="noreferrer"
              >
                <img src={hombeB} alt="icon home" /> 1234 Plaza Indepentencia, Montevideo, Uruguay
              </a>
            </div>
          </>
        )}
        {house.startsWith('/admin') && (
          <>
            <li className={styles.anchor}>
              <NavLink
                to="/home"
                className={styles.navbarLink}
                activeClassName={styles.active}
                data-testid="admin-home-btn"
              >
                <img src={home} alt="icon home" />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/classes"
                className={styles.navbarLink}
                activeClassName={styles.active}
                data-testid="admin-classes-btn"
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
                data-testid="admin-trainers-btn"
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
                data-testid="admin-activities-btn"
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
                data-testid="admin-subscriptions-btn"
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
                data-testid="admin-members-btn"
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
                data-testid="admin-profile-btn"
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
              <NavLink
                to="/home"
                className={styles.navbarLink}
                activeClassName={styles.active}
                data-testid="member-home-btn"
              >
                <img src={home} alt="icon home" />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/member/classes"
                className={styles.navbarLink}
                activeClassName={styles.active}
                data-testid="member-classes-btn"
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
                data-testid="member-activities-btn"
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
                data-testid="member-profile-btn"
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

export default Navbar;
