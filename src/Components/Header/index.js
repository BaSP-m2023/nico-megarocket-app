import styles from './header.module.css';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function Header() {
  const house = useLocation().pathname;

  const ifUser = (houses) => {
    if (houses.startsWith('/home')) {
      return <h4>Welcome</h4>;
    }
    if (houses.startsWith('/admin')) {
      return <h4>Admin</h4>;
    }
    if (houses.startsWith('/member')) {
      return <h4>Member</h4>;
    }
  };

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.brand}>Mega Rocket</div>
        <div className={styles.brand}>{ifUser(house)}</div>
      </div>
    </header>
  );
}

export default Header;
