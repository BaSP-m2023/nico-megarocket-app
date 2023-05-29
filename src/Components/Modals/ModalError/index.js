import React from 'react';
import styles from './modalError.module.css';

const ModalError = ({ setModalErroOpen, message }) => {
  return (
    <div className={styles.modalAlert}>
      <div className={styles.headerModal}>
        <p className={styles.titleModal}>ERROR</p>
        <button className={styles.btnClose} onClick={() => setModalErroOpen(false)}>
          X
        </button>
      </div>
      <p className={styles.textModal}>{message}</p>
    </div>
  );
};

export default ModalError;
