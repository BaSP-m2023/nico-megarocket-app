import React from 'react';
import styles from './disable-input.module.css';

const Inputs = ({ register, error, type, isDisabled, nameInput, nameTitle, testId }) => {
  return (
    <div className={styles.nameLabel} data-testid={testId}>
      <label>{nameTitle}</label>
      <input
        type={type}
        name={nameInput}
        className={error ? `${styles.errorInput} ${styles.normalInput}` : styles.normalInput}
        disabled={isDisabled}
        {...register(nameInput, { required: { value: true, message: 'This field is required' } })}
      />
      {error ? <p className={styles.error}>{error}</p> : <p className={styles.spaceErrorMsg}></p>}
    </div>
  );
};

export default Inputs;
