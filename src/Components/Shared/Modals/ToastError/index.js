import React from 'react';
import styles from './toastError.module.css';

const ToastError = ({ setToastErroOpen, message, testId }) => {
  return (
    <div className={styles.modalAlert} data-testid={testId}>
      <div className={styles.headerModal}>
        <p className={styles.titleModal}>ERROR</p>
        <button className={styles.btnClose} onClick={() => setToastErroOpen(false)}>
          X
        </button>
      </div>
      <p className={styles.textModal}>{message}</p>
    </div>
  );
};

export default ToastError;
