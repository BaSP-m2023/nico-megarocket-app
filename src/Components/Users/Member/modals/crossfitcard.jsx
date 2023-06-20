import React from 'react';
import styles from './activityCard.module.css';

const crossfitModal = ({ onClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.activityCard}>
        <img
          className={styles.activityCardImage}
          src={`${process.env.PUBLIC_URL}/assets/images/Crossfit.svg`}
          alt="crossfit"
        />
        <h2>Crossfit</h2>
        <p>
          High-intensity workouts combining cardio, weightlifting, and functional movements. Achieve
          your fitness goals in a supportive community. Join us now!
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default crossfitModal;
