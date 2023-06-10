import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.main}>
        <p className={styles.appName}>MegaRocket</p>
      </div>
      <div className={styles.license}>
        <div className={styles.copyright}>Copyright © {new Date().getFullYear()} Radium Rocket</div>
      </div>
    </footer>
  );
}

export default Footer;
