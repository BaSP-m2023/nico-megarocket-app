import styles from './header.module.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.brand}>Radium Rocket</div>
        <div>
          <a href={'https://www.facebook.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/facebook.svg`}
            />
          </a>
          <a href={'https://twitter.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`}
            />
          </a>
          <a href={'https://www.instagram.com/radium.rocket/'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`}
            />
          </a>
        </div>
      </div>
      <nav className={styles.navbar}>
        <h1 className={styles.appName}>MegaRocket</h1>
        <ul className={styles.rutes}>
          <li>
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
    </header>
  );
}

export default Header;
