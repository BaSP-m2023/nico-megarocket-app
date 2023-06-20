import React from 'react';
import styles from './activityCard.module.css';

const bodyBuildingModal = ({ onClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.activityCard}>
        <img
          className={styles.activityCardImage}
          src={`${process.env.PUBLIC_URL}/assets/images/Bodybuilding.svg`}
          alt="body-building"
        />
        <h2>Body Building</h2>
        <p>
          Embark on a transformative journey of muscle development and strength training. Our
          bodybuilding program is designed to sculpt and define your muscles, enhance your physique,
          and elevate your overall strength. Train with expert guidance, push your limits, and
          unlock your full potential.
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default bodyBuildingModal;
