import React, { useState } from 'react';
import styles from './layout.module.css';
import Header from '../Header/index';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/index';
import HambMenu from 'Components/HamburguerMenu';

function Layout(props) {
  const [clickHamburguer, setClickHamburguer] = useState(false);

  return (
    <div className={styles.container}>
      <Header setClickHamburguer={setClickHamburguer} clickHamburguer={clickHamburguer} />
      <div className={styles.hamburguerNavbar}>
        {clickHamburguer && (
          <HambMenu routes={props.routes} setClickHamburguer={setClickHamburguer} />
        )}
      </div>
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
