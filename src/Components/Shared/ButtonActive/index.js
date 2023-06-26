import React, { useState } from 'react';
import styles from './buttonActive.module.css';

const ButtonActive = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.container}>
      <div className={isChecked ? styles.toggleSwitch : styles.toggleSwitched}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={isChecked}
          onClick={handleToggle}
        />
        <label className={styles.label}>
          <div className={isChecked ? styles.inner : styles.switch}>a</div>
        </label>
      </div>
    </div>
  );
};

export default ButtonActive;
