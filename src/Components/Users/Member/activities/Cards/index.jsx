import React, { useState, useEffect } from 'react';
import styles from './cards.module.css';
import ActivityModal from '../../modals/activityModal';

function Cards({ title, description, image, testId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardDescription, setcardDescription] = useState('');

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const defaultImg = (
    <div className={styles.imgContainer}>
      <div className={styles.cardImage}>
        <img
          className={styles.defaultImg}
          src={`${process.env.PUBLIC_URL}/assets/images/rocket.jpg`}
          alt="default img"
        />
      </div>
    </div>
  );

  useEffect(() => {
    const text = description.length > 62 ? description.slice(0, 52) + '...' : description;
    setcardDescription(text);
  }, []);

  return (
    <div className={styles.container} data-testid={testId}>
      <div className={styles.cardContainer}>
        <div className={styles.imgContainer}>
          {image ? (
            <img className={styles.cardImage} src={image} alt={`image ${title}`} />
          ) : (
            defaultImg
          )}
        </div>
        <div className={styles.dataContainer}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.textDescription}>{cardDescription}</p>
        </div>
        <div>
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
