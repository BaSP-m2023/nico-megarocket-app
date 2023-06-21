import React from 'react';
import styles from '../modals/activityModal.module.css';

const activityModal = ({ title, description, imageName, onClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.activityCard}>
        <img
          className={styles.activityCardImage}
          src={`${process.env.PUBLIC_URL}/assets/images/${imageName}`}
          alt={`image ${title}`}
        />
        <div>
          <h2 className={styles.subtitle}>{title}</h2>
          <p className={styles.description}>{description}</p>
          <button className={styles.activityButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default activityModal;
