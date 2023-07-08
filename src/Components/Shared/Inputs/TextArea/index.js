import React from 'react';
import styles from './text-area.module.css';

const TextArea = ({ register, error, nameInput, nameTitle, testId }) => {
  return (
    <div
      className={error ? `${styles.nameLabel} ${styles.labelError}` : styles.nameLabel}
      data-testid={testId}
    >
      <label>{nameTitle}</label>
      <textarea
        name={nameInput}
        className={error ? `${styles.errorInput} ${styles.normalInput}` : styles.normalInput}
        {...register(nameInput, { required: { value: true, message: 'This field is required' } })}
      />
      {error ? (
        <div className={styles.errorContainer}>
          <div className={styles.errorLogo}>!</div>
          <p className={styles.error}>{error}</p>
        </div>
      ) : (
        <p className={styles.spaceErrorMsg}></p>
      )}
    </div>
  );
};

export default TextArea;
