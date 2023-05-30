import React from 'react';
import styles from './modalSuccess.module.css';

const ModalSuccess = ({ setModalSuccessOpen, message }) => {
  return (
    <div className={styles.modalAlert}>
      <div className={styles.modalStyles}>
        <p className={styles.titleModal}>SUCCESSFUL</p>
        <p className={styles.textModal}>{message}</p>
        <button className={styles.btnAccept} onClick={() => setModalSuccessOpen(false)}>
          OK
        </button>
      </div>
    </div>
  );
};

export default ModalSuccess;
