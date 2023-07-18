import React, { useState } from 'react';
import styles from '../modals/activityModal.module.css';
import { useHistory } from 'react-router-dom';

const activityModal = ({ title, description, imageName, onClose, testId }) => {
  const [isClosing, setIsClosing] = useState(false);

  const history = useHistory();
  const handleClick = () => {
    history.push('/member/classes', { params: { activity: `${title}` } });
  };
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const defaultImg = (
    <img
      className={styles.cardImage}
      src={`${process.env.PUBLIC_URL}/assets/images/rocket.jpg`}
      alt="default img"
    />
  );

  return (
    <div
      className={`${styles.container}  ${isClosing ? styles.animationExit : ''}`}
      data-testid={testId}
    >
      <div
        className={`${styles.activityCard} ${styles.animation}
        ${isClosing ? styles.animationModalExit : ''}`}
      >
        {imageName ? (
          <img className={styles.cardImage} src={imageName} alt={`image ${title}`} />
        ) : (
          defaultImg
        )}
        <div className={styles.activityCardText}>
          <div>
            <h2 className={styles.cardSubtitle}>{title}</h2>
            <p className={styles.cardDescription}>{description}</p>
          </div>
          <div className={styles.activityCardButton}>
            <button
              className={`${styles.cardButton} ${styles.cardButtonJoin}`}
              onClick={handleClick}
            >
              Join
            </button>
            <button className={styles.cardButton} onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default activityModal;
