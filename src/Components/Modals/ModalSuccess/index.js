import React from 'react';
import styles from './modalSuccess.module.css';

const ModalSuccess = ({ setModalSuccessOpen, message }) => {
  const onClose = () => {
    setModalSuccessOpen(false);
  };
  return (
    <div className={styles.modalAlert}>
      <div className={styles.modalStyles}>
        <p className={styles.titleModal}>SUCCESSFUL</p>
        <p className={styles.textModal}>{message}</p>
        <button className={styles.btnAccept} onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default ModalSuccess;
