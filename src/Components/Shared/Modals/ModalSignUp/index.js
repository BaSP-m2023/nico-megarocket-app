import React from 'react';
import styles from './modalSignUp.module.css';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/auth/thunks';
import { useHistory } from 'react-router-dom';

const ModalSignUp = ({ setModalShow }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logoutAction = async () => {
    await dispatch(logout());
    setModalShow(false);
    history.push('/auth/sign-up');
  };
  return (
    <div className={styles.wholeContainer}>
      <div className={styles.container}>
        <div className={styles.textModal}>
          <h2 className={styles.title}>Account is currently logged</h2>
          <p className={styles.subtitle}>Choose an option</p>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.btnCancel}
            onClick={() => {
              history.push('/auth/login');
            }}
          >
            Enter
          </button>
          <button className={styles.btnAcceptDelete} onClick={logoutAction}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSignUp;
