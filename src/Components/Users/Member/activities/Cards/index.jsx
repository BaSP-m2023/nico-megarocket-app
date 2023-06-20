import styles from './cards.module.css';
import React, { useState } from 'react';

function Cards({ title, description, image }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img className={styles.cardImage} src={image}></img>
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={handleButtonClick}>Learn More</button>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Cards;
