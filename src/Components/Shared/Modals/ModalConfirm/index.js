import React from 'react';
import styles from './modalConfirm.module.css';

const ModalConfirm = ({ message, method, onConfirm, setModalConfirmOpen, testId }) => {
  const onConfirmFunction = () => {
    onConfirm(), setTimeout(() => setModalConfirmOpen(false), 800);
  };

  return (
    <div className={styles.modalAlert} data-testid={testId}>
      <div className={styles.modalStyles}>
        <div className={styles.modalHeader}>
          <p
            className={styles.titleModal}
            style={method.toLowerCase() === 'delete' ? { color: '#F13312' } : { color: '#94ca7d' }}
          >
            Attention
          </p>
        </div>
        <div className={styles.imgContainer}>
          <img
            className={styles.close_icon}
            onClick={() => {
              setModalConfirmOpen(false);
            }}
            src={`${process.env.PUBLIC_URL}/assets/images/x-circle.svg`}
            alt="cancel icon"
          />
        </div>
        <div>
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
    </div>
  );
};

export default ModalConfirm;
