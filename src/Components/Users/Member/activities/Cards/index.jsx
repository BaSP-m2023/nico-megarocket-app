import styles from './cards.module.css';
import React from 'react';

function Cards({ title, description, image }) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img className={styles.cardImage} src={image}></img>
        <h2>{title}</h2>
        <p>{description}</p>
        <a href="">Learn More</a>
      </div>
    </div>
  );
}
export default Cards;
