import React from 'react';
import { logout } from 'redux/auth/thunks';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './logout.module.css';

function LogOut() {
  const history = useHistory();
  const dispatch = useDispatch();

  const logoutAction = async () => {
    await dispatch(logout());
    history.push('/auth/login');
  };

  return (
    <div className={styles.logButton} onClick={logoutAction}>
      <img
        className={styles.logImg}
        src={`${process.env.PUBLIC_URL}/assets/images/logout.png`}
        alt={'log out icon'}
      ></img>
      <p className={styles.logText}>Log Out</p>
    </div>
  );
}

export default LogOut;
