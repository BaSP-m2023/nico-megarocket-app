import styles from './header.module.css';
import ProfileMenu from './ProfileMenu';

function Header() {
  const token = sessionStorage.getItem('token');
  const logo = `${process.env.PUBLIC_URL}/assets/images/logo.png`;
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.containerLogo}>
          <div className={styles.imgLogo}>
            <img src={logo} alt="Rocket logo" />
          </div>
          <div className={styles.brand}>Mega Rocket Gym</div>
        </div>
        <div className={styles.profileMenu}>{token && <ProfileMenu />}</div>
      </div>
    </header>
  );
}

export default Header;
