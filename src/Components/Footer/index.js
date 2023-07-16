import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.main}>
        <p className={styles.appName}>MegaRocket</p>
        <div className={styles.contact}>
          <p className={styles.infoTitle}>Find Us</p>
          <p className={styles.info}>
            <a href="tel:+54 341-4569878">Rosario: Address 1234 - +54 341-4569878</a>
          </p>
          <p className={styles.info}>
            <a href="tel:+598 11-3489838">Montevideo: Address 1234 - +598 11-3489838</a>
          </p>
          <p className={styles.info}>
            <a href="mailto:radiumrocket@gmail.com">radiumrocket@gmail.com</a>
          </p>
        </div>
      </div>
      <div className={styles.license}>
        <div className={styles.copyright}>Copyright © {new Date().getFullYear()} Radium Rocket</div>
        <div className={styles.containerSocial}>
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
    </footer>
  );
}

export default Footer;
