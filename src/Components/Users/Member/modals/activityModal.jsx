import React from 'react';
import styles from '../modals/activityModal.module.css';

const activityModal = ({ title, description, imageName, onClose, testId }) => {
  return (
    <div className={styles.container} data-testid={testId}>
      <div className={styles.activityCard}>
        <img
          className={styles.cardImage}
          src={`${process.env.PUBLIC_URL}/assets/images/${imageName}`}
          alt={`image ${title}`}
        />
        <div className={styles.activityCardText}>
          <div>
            <h2 className={styles.cardSubtitle}>{title}</h2>
            <p className={styles.cardDescription}>{description}</p>
          </div>
          <div className={styles.activityCardButton}>
            <button className={styles.cardButton} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default activityModal;
