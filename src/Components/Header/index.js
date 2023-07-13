import styles from './header.module.css';
import { useHistory } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';

function Header() {
  const token = sessionStorage.getItem('token');
  const logo = `${process.env.PUBLIC_URL}/assets/images/logo.png`;
  const linkUrl = '/auth/home';

  const history = useHistory();

  const handleLinkClick = (event) => {
    event.preventDefault();
    history.push(linkUrl);
  };

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.containerLogo}>
          <a href="#" onClick={handleLinkClick}>
            <div className={styles.imgLogo}>
              <img src={logo} alt="Rocket logo" />
            </div>
            <div className={styles.brand}>Mega Rocket Gym</div>
          </a>
        </div>
        <div className={styles.profileMenu}>{token && <ProfileMenu />}</div>
      </div>
    </header>
  );
}

export default Header;
