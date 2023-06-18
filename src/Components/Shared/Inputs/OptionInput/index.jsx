import React from 'react';
import styles from './option-input.module.css';

const SelectInput = ({ data, dataLabel, aValue, setValue, name, register, error }) => {
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
  };

  return (
    <div className={styles.containerInput}>
      <label htmlFor="selectInput">{dataLabel}:</label>
      <select
        onChange={(e) => {
          setValue(name, e.target.value);
        }}
        value={aValue[name]}
        className={error ? `${styles.errorInput} ${styles.optionInput}` : styles.optionInput}
        id="selectInput"
        name={name}
        {...register(name, { required: { value: true, message: 'This field is required' } })}
      >
        <option>Pick {name}</option>
        {data.map((item, index) => {
          return (
            <option key={index} value={item._id}>
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
