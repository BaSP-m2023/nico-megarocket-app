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
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default activityModal;
