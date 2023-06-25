import React from 'react';
import styles from './option-input.module.css';

const SelectInput = ({ data, dataLabel, name, register, error }) => {
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
    <div className={styles.containerInput}>
      <label htmlFor="selectInput">{dataLabel}:</label>
      <select
        className={error ? `${styles.errorInput} ${styles.optionInput}` : styles.optionInput}
        name={name}
        {...register(name, { required: { value: true, message: 'This field is required' } })}
      >
        <option value="">Pick {name}</option>
        {data.map((item, index) => {
          return (
            <option key={index} value={item._id ? item._id : item}>
              {ifFirstName(item)}
              {ifObject(item)}
            </option>
          );
        })}
      </select>
      {error ? <p className={styles.error}>{error}</p> : <p className={styles.spaceErrorMsg}></p>}
    </div>
  );
};

export default SelectInput;
