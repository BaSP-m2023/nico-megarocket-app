import React from 'react';
import styles from './modalConfirm.module.css';

const ModalConfirm = ({ message, method, onConfirm, setModalConfirmOpen }) => {
  const onConfirmFunction = () => {
    onConfirm(), setTimeout(() => setModalConfirmOpen(false), 800);
  };

  return (
    <div className={styles.modalAlert}>
      <div className={styles.modalStyles}>
        <img
          className={styles.close_icon}
          onClick={() => {
            setModalConfirmOpen(false);
          }}
          src={`${process.env.PUBLIC_URL}/assets/images/Delete.svg`}
          alt="cancel icon"
        />
        <p
          className={styles.titleModal}
          style={method.toLowerCase() === 'delete' ? { color: '#F13312' } : { color: '#94ca7d' }}
        >
          Attention
        </p>
        <p className={styles.textModal}>{message}</p>
        <div className={styles.buttons}>
          <button
            className={styles.btnCancel}
            onClick={() => {
              setModalConfirmOpen(false);
            }}
          >
            Cancel
          </button>
          <button
            className={
              method.toLowerCase() === 'delete' ? styles.btnAcceptDelete : styles.btnAccept
            }
            onClick={onConfirmFunction}
          >
            {method}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
