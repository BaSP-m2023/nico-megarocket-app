import React, { useState } from 'react';
import styles from './modalConfirm.module.css';

const ModalConfirm = ({ message, method, onConfirm, setModalConfirmOpen, testId }) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const onConfirmFunction = () => {
    setIsConfirming(true);
    onConfirm(), setTimeout(() => setModalConfirmOpen(false), 800);
  };
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setModalConfirmOpen(false);
    }, 300);
  };

  return (
    <div
      className={`${styles.modalAlert}  ${isClosing ? styles.animationExit : ''}`}
      data-testid={testId}
    >
      <div
        className={`${styles.modalStyles} ${styles.animation} ${
          isClosing ? styles.animationModalExit : ''
        }`}
      >
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
            onClick={handleClose}
            src={`${process.env.PUBLIC_URL}/assets/images/x-circle.svg`}
            alt="cancel icon"
          />
        </div>
        <div>
          <p className={styles.textModal}>{message}</p>
          <div className={styles.buttons}>
            <button className={styles.btnCancel} onClick={handleClose}>
              Cancel
            </button>
            <button
              className={
                method.toLowerCase() === 'delete' ? styles.btnAcceptDelete : styles.btnAccept
              }
              disabled={isConfirming}
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
