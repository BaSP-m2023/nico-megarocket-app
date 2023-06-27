import styles from './header.module.css';

function Header() {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.brand}>Mega Rocket</div>
      </div>
    </header>
  );
}

export default Header;
