import React from 'react';
import styles from './navbar.module.css';
import { NavLink /*, useLocation*/ } from 'react-router-dom';

// const member = `${process.env.PUBLIC_URL}/assets/images/member.png`;
// const home = `${process.env.PUBLIC_URL}/assets/images/home.png`;
const hombeB = `${process.env.PUBLIC_URL}/assets/images/HomeB.png`;
// const trainer = `${process.env.PUBLIC_URL}/assets/images/trainer.png`;
// const classs = `${process.env.PUBLIC_URL}/assets/images/class.png`;
// const suscription = `${process.env.PUBLIC_URL}/assets/images/suscription.png`;
// const members = `${process.env.PUBLIC_URL}/assets/images/muscle.png`;
// const activities = `${process.env.PUBLIC_URL}/assets/images/runner.png`;
// const login = `${process.env.PUBLIC_URL}/assets/images/login.png`;
// const mail = `${process.env.PUBLIC_URL}/assets/images/mail.png`;
// const phone = `${process.env.PUBLIC_URL}/assets/images/phone.png`;

const Navbar = (props) => {
  // const house = useLocation().pathname;
  console.log(props.routes);
  return (
    <nav className={styles.navbar}>
      <ul className={styles.rutes}>
        {props.routes.map((route) => (
          <li className={styles.homeButtons} key={route.name}>
            <NavLink to={route.path} className={styles.navbarLinkButtons} data-testid="home-btn">
              <img src={hombeB} alt="icon home" />
              {route.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
