import styles from './header.module.css';
import { useHistory } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';

function Header({ setClickHamburguer, clickHamburguer }) {
  const token = sessionStorage.getItem('token');
  const logo = `${process.env.PUBLIC_URL}/assets/images/logo.png`;
  const linkUrl = '/auth/home';

  const history = useHistory();

  const handleLinkClick = () => {
    history.push(linkUrl);
    setClickHamburguer(false);
  };

  return (
    <header className={styles.wholeContainer}>
      <div className={styles.container}>
        <div
          className={styles.hamburguerMenu}
          onClick={() => {
            setClickHamburguer(!clickHamburguer);
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/menuH.png`}
            alt={`icon menu `}
            className={styles.navIcon}
          />
        </div>
        <div className={styles.containerLogo}>
          <div className={styles.boxTextImg} title="go back to Home" onClick={handleLinkClick}>
            <div className={styles.imgLogo}>
              <img src={logo} alt="Rocket logo" />
            </div>
            <div className={styles.brand}>Mega Rocket Gym</div>
          </div>
        </div>
        <div className={styles.profileMenu}>{token && <ProfileMenu />}</div>
      </div>
    </header>
  );
}

export default Header;
