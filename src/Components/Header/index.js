import styles from './header.module.css';
import ProfileMenu from './ProfileMenu';

function Header() {
  const token = sessionStorage.getItem('token');
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.brand}>Mega Rocket</div>
        <div className={styles.profileMenu}>{token && <ProfileMenu />}</div>
      </div>
    </header>
  );
}

export default Header;
