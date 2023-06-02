import React from 'react';
import styles from './modalDeleteConf.module.css';

function ModalDeleteConfirmation({ show, setShowConfirmationModal, adminFullName }) {
  if (!show) {
    return null;
  }

  const closeModal = () => {
    setShowConfirmationModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <img
          className={styles.close_icon}
          onClick={closeModal}
          src={`${process.env.PUBLIC_URL}/assets/images/Delete.svg`}
          alt="cancel icon"
        />
        <div className={styles.text_cont}>
          <h3 className={styles.modal_title}>SUCCESSFUL</h3>
          <p className={styles.modal_desc}>{adminFullName} has been deleted</p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.confirm_button} onClick={closeModal}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDeleteConfirmation;
