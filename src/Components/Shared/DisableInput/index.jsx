import React from 'react';
import styles from './disable-select-input.css';

const Inputs = ({ text, type, disabled }) => {
  return (
    <>
      <input
        className={
          type === 'disable' ? `${styles.disableInput} ${styles.normalInput}` : styles.normalInput
        }
        disabled={disabled}
        value={text}
      />
    </>
  );
};

export default Inputs;
