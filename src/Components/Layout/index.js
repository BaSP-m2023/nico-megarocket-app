import React from 'react';
import styles from './layout.module.css';
import Header from '../Header/index';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/index';

function Layout(props) {
  const routes = [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'Login',
      path: '/auth/login'
    },
    {
      name: 'Sign Up',
      path: '/auth/sign-up'
    }
  ];
  console.log(props, 'layout');
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.asideContainer}>
          <aside>
            <Navbar routes={routes} />
          </aside>
        </div>
        <div className={styles.switchContainer}>Home{props.children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
