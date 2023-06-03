import React from 'react';
import styles from './modalConfirm.module.css';

const ModalConfirm = ({ message, method, onConfirm, setModalConfirmOpen }) => {
  return (
    <div className={styles.modalAlert}>
      <div className={styles.modalStyles}>
        <p className={styles.titleModal}>Attention</p>
        <p className={styles.textModal}>{message}</p>
        <button className={styles.btnAccept} onClick={onConfirm}>
          {method}
        </button>
        <button
          className={styles.btnCancel}
          onClick={() => {
            setModalConfirmOpen(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ModalConfirm;
