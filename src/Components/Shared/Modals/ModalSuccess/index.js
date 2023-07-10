import React from 'react';
import styles from './modalSuccess.module.css';

const ModalSuccess = ({ message, testId }) => {
  return (
    <div className={styles.modalAlert} data-testid={testId}>
      <div className={styles.modalStyles}>
        <div className={styles.modalHeader}>
          <p className={styles.titleModal}>SUCCESSFUL</p>
        </div>
        <div className={styles.contentContainer}>
          <p className={styles.textModal}>{message} succesfully!</p>
          <div className={styles.buttons}></div>
        </div>
      </div>
    </div>
  );
};

export default ModalSuccess;
