import React from 'react';
import styles from './disable-input.module.css';

const Inputs = ({ type, isDisabled, nameInput, nameTitle, register, error, value }) => {
  return (
    <div className={styles.nameLabel}>
      <label>{nameTitle}</label>
      <input
        className={
          type === 'disable' ? `${styles.disableInput} ${styles.normalInput}` : styles.normalInput
        }
        {...register(nameInput)}
        type={type}
        disabled={isDisabled}
        name={nameInput}
        value={value}
      />
      {error && <p>{error}</p>}
    </div>
  );
};

export default Inputs;
