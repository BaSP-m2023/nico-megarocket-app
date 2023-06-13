import React from 'react';
import styles from './option-input.module.css';

const SelectInput = ({ data, dataLabel, onChangeOption, setValue, name }) => {
  const ifFirstName = (item) => {
    if (item.firstName && item.lastName) {
      return `${item.firstName} ${item.lastName}`;
    }
  };

  const ifObject = (item) => {
    if (typeof item === 'object') {
      return item.activity ? `${item.activity.name} ${item.activity.hour}` : item.name;
    }
  };

  return (
    <div className={styles.containerInput}>
      <label htmlFor="selectInput">{dataLabel}:</label>
      <select
        onChange={onChangeOption}
        value={setValue}
        className={styles.optionInput}
        id="selectInput"
        name={name}
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
    </div>
  );
};

export default SelectInput;
