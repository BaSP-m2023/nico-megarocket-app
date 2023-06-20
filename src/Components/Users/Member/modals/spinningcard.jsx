import React from 'react';
import styles from './activityCard.module.css';

const spinningModal = ({ onClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.activityCard}>
        <img
          className={styles.activityCardImage}
          src={`${process.env.PUBLIC_URL}/assets/images/Spinning.svg`}
          alt="spinning"
        />
        <h2>Spinning</h2>
        <p>
          Ignite Your Ride with Spinning. Join our dynamic cycling classes for a heart-pumping
          cardio workout like no other. Pedal to the rhythm, torch calories, and boost your
          endurance in a motivating and energetic atmosphere. Get ready to sweat, challenge
          yourself, and experience the exhilaration of spinning!
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default spinningModal;
