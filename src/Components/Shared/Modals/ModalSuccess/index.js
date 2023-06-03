import React from 'react';
import styles from './modalSuccess.module.css';

const ModalSuccess = ({ setModalSuccessOpen, message }) => {
  const onClose = () => {
    setModalSuccessOpen(false);
  };
  return (
    <div className={styles.modalAlert}>
      <div className={styles.modalStyles}>
        <img
          className={styles.close_icon}
          onClick={onClose}
          src={`${process.env.PUBLIC_URL}/assets/images/Delete.svg`}
          alt="cancel icon"
        />
        <div className={styles.text_cont}>
          <h3 className={styles.titleModal}>SUCCESSFUL</h3>
          <p className={styles.textModal}>{message}</p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.btnAccept} onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSuccess;
