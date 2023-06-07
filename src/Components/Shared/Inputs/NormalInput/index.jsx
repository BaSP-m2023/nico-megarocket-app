import React from 'react';
import styles from './disable-input.module.css';

const Inputs = ({ text, type, isDisabled, change, nameInput, nameTitle }) => {
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
      />
    </div>
  );
};

export default Inputs;
