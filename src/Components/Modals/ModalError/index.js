import React from 'react';
import styles from './ModalError.module.css';

const ModalError = ({ setModalErroOpen, message }) => {
  return (
    <div className={styles.modalAlert}>
      <div className={styles.modalStyles}>
        <p className={styles.titleModal}>ERROR</p>
        <p className={styles.textModal}>{message}</p>
        <button className={styles.btnAccept} onClick={() => setModalErroOpen(false)}>
          OK
        </button>
      </div>
    </div>
  );
};

export default ModalError;
