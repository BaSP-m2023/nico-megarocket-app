import React from 'react';
import styles from './disable-input.module.css';

const Inputs = ({ text, type, isDisabled, change, nameInput, nameTitle, register, error }) => {
  return (
    <div className={styles.nameLabel}>
      <label>{nameTitle}</label>
      <input
        className={
          type === 'disable' ? `${styles.disableInput} ${styles.normalInput}` : styles.normalInput
        }
        type={type}
        disabled={isDisabled}
        value={text}
        name={nameInput}
        onChange={change}
        {...register(nameInput)}
      />
      {error && <p>{error}</p>}
    </div>
  );
};

export default Inputs;
