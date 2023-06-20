import React from 'react';
import styles from './activityCard.module.css';

const boxingModal = ({ onClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.activityCard}>
        <img
          className={styles.activityCardImage}
          src={`${process.env.PUBLIC_URL}/assets/images/Boxing.svg`}
          alt="boxing"
        />
        <h2>Boxing</h2>
        <p>
          Join our gym today to build strength, improve agility, and master essential self-defense
          skills. Unleash your inner warrior and transform your body with our dynamic boxing
          program.
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default boxingModal;
