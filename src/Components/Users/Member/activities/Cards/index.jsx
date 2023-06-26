import React, { useState } from 'react';
import styles from './cards.module.css';
import ActivityModal from '../../modals/activityModal';

function Cards({ title, description, image, testId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container} data-testid={testId}>
      <div className={styles.cardContainer}>
        <div className={styles.imgContainer}>
          <img
            className={styles.cardImage}
            src={`${process.env.PUBLIC_URL}/assets/images/${image}`}
            alt={`image ${title}`}
          />
        </div>
        <div className={styles.dataContainer}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.textDescription}>{description}</p>
          <button className={styles.cardButton} onClick={handleButtonClick}>
            Learn More
          </button>
        </div>
      </div>
      {isModalOpen && (
        <ActivityModal
          title={title}
          description={description}
          imageName={image}
          onClose={handleCloseModal}
          testId="activity-modal"
        />
      )}
    </div>
  );
}

export default Cards;
