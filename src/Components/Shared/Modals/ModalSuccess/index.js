import React from 'react';
import styles from './modalSuccess.module.css';

const ModalSuccess = ({ setModalSuccessOpen, message, testId }) => {
  const onClose = () => {
    setModalSuccessOpen(false);
  };
  return (
    <div className={styles.modalAlert} data-testid={testId}>
      <div className={styles.modalStyles}>
        <div className={styles.modalHeader}>
          <p className={styles.titleModal}>SUCCESSFUL</p>
        </div>
        <div className={styles.imgContainer}>
          <img
            className={styles.close_icon}
            onClick={onClose}
            src={`${process.env.PUBLIC_URL}/assets/images/x-circle.svg`}
            alt="cancel icon"
          />
        </div>

        <div className={styles.contentContainer}>
          <p className={styles.textModal}>{message} succesfully!</p>
          <div className={styles.buttons}>
            <button className={styles.btnAccept} onClick={onClose}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSuccess;
