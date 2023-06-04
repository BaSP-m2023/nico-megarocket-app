import React, { useState } from 'react';
import styles from './option-input.module.css';

const SelectInput = ({ dataOptions }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelect = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <div className={styles.containerInput}>
      <label htmlFor="selectInput">Select an option:</label>
      <select
        className={styles.optionInput}
        id="selectInput"
        value={selectedOption}
        onChange={handleSelect}
      >
        <option value="">Default</option>
        {dataOptions.map((select, index) => {
          return (
            <option key={index} value={select}>
              {select}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectInput;
