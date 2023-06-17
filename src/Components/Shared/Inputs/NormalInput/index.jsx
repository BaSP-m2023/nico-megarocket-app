import React from 'react';
import styles from './disable-input.module.css';

const Inputs = ({ type, isDisabled, nameInput, nameTitle, error, value }) => {
  return (
    <div className={styles.nameLabel}>
      <label>{nameTitle}</label>
      <input
        className={
          type === 'disable' ? `${styles.disableInput} ${styles.normalInput}` : styles.normalInput
        }
        type={type}
        disabled={isDisabled}
        value={value}
        name={nameInput}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default Inputs;
