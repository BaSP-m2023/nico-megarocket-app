import React, { useState } from 'react';
import styles from './container.module.css';

function DivContainer({ item }) {
  const [toggle, setToggle] = useState(true);
  const handleToggle = () => {
    setToggle(!toggle);
    const audioLabel = document.createElement('audio');
    if (toggle) {
      audioLabel.setAttribute('src', `${process.env.PUBLIC_URL}/assets/sounds/yeahBuddy.mp3`);
    } else {
      audioLabel.setAttribute('src', `${process.env.PUBLIC_URL}/assets/sounds/lightWeight.mp3`);
    }
    audioLabel.play();
  };
  return (
    <>
      {item.slots !== 0 ? (
        <div
          className={toggle ? styles.classesContainer : styles.selectedContainer}
          onClick={() => handleToggle()}
        >
          <p className={toggle ? styles.textClasses : styles.textSelectedClasses}>
            {item.activity.name}
          </p>
          <p className={toggle ? styles.slotsClasses : styles.slotsSelectedClasses}>
            {item.slots} Slots
          </p>
        </div>
      ) : (
        <div className={item.slots === 0 && styles.classesFullContainer}>
          <p className={item.slots === 0 ? styles.nameFullClasses : styles.nameClasses}>
            {item.activity.name}
          </p>
          <p className={item.slots === 0 ? styles.slotsFullClasses : styles.slotsClasses}>
            {item.slots} Slots
          </p>
        </div>
      )}
    </>
  );
}

export default DivContainer;
