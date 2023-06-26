import React from 'react';
import styles from './layout.module.css';
import Header from '../Header/index';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/index';

function Layout(props) {
  console.log(props, 'layout');
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.asideContainer}>
          <aside>
            <Navbar routes={props.routes} />
          </aside>
        </div>
        <div className={styles.switchContainer}>{props.children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
