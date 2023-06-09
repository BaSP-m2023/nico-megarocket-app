import React from 'react';
import styles from './option-input.module.css';

const SelectInput = ({ data, dataLabel, name, register, error, testId }) => {
  const ifFirstName = (item) => {
    if (item.firstName && item.lastName) {
      return `${item.firstName} ${item.lastName}`;
    }
  };

  const ifObject = (item) => {
    if (typeof item.activity === 'object') {
      return item.activity ? `${item.activity.name} -  ${item.hour}` : `incomplete ${dataLabel}`;
    }
    if (typeof item === 'object') {
      return item ? item.name : `incomplete ${dataLabel}`;
    }
    if (typeof item !== 'object') {
      return item;
    }
  };

  return (
    <div className={styles.containerInput} data-testid={testId}>
      <label
        htmlFor="selectInput"
        className={error ? `${styles.nameLabel} ${styles.labelError}` : styles.nameLabel}
      >
        {dataLabel}
      </label>
      <select
        className={error ? `${styles.errorInput} ${styles.optionInput}` : styles.optionInput}
        name={name}
        {...register(name, { required: { value: true, message: 'This field is required' } })}
      >
        <option className={styles.selectOption} value="">
          Pick {name}
        </option>
        {data.map((item, index) => {
          return (
            <option className={styles.selectOption} key={index} value={item._id ? item._id : item}>
              {ifFirstName(item)}
              {ifObject(item)}
            </option>
          );
        })}
      </select>
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

export default SelectInput;
