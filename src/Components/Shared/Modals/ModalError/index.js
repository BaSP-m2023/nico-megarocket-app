import React from 'react';
import styles from './modalError.module.css';

const ModalSuccess = ({ setModalErrorOpen, message, headerMessage, testId }) => {
  const onClose = () => {
    setModalErrorOpen(false);
  };
  return (
    <>
      {setModalErrorOpen && (
        <div className={styles.modalAlert} data-testid={testId}>
          <div className={styles.modalStyles}>
            <div className={styles.modalHeader}>
              <p className={styles.titleModal}>{headerMessage}</p>
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
              <p className={styles.textModal}>{message}</p>
            </div>
          </div>
          {setTimeout(() => {
            setModalErrorOpen(false);
          }, 2000)}
        </div>
      )}
    </>
  );
};

export default ModalSuccess;
