import React from 'react';
import styles from './activityCard.module.css';

const functionalModal = ({ onClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.activityCard}>
        <img
          className={styles.activityCardImage}
          src={`${process.env.PUBLIC_URL}/assets/images/Functional.svg`}
          alt="functional"
        />
        <h2>Functional</h2>
        <p>
          Our functional fitness program targets core stability, flexibility, and overall body
          strength. Prepare to enhance your everyday performance, prevent injuries, and excel in all
          aspects of life. Experience the transformative power of functional training!
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default functionalModal;
