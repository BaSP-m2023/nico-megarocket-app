import React, { useState } from 'react';

const SelectInput = ({ dataOptions }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelect = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <div>
      <label htmlFor="selectInput">Select an option:</label>
      <select id="selectInput" value={selectedOption} onChange={handleSelect}>
        <option value="">Select</option>
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
