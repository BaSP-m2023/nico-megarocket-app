import React from 'react';
import styles from './disable-input.module.css';

const Inputs = ({ register, error, type, isDisabled, nameInput, nameTitle }) => {
  return (
    <div className={styles.nameLabel}>
      <label>{nameTitle}</label>
      <input
        {...register(nameInput, { required: { value: true, message: 'This field is required' } })}
        className={
          type === 'disable' ? `${styles.disableInput} ${styles.normalInput}` : styles.normalInput
        }
        type={type}
        disabled={isDisabled}
        name={nameInput}
      />
      {error && <p>{error}</p>}
    </div>
  );
};

export default Inputs;
