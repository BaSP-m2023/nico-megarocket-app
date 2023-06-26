import React, { useState } from 'react';
import styles from './placeholder-input.css';

const PlaceholderInput = ({ type, placeholder, name, testId }) => {
  const [newValue, setValue] = useState(placeholder);

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="inputPlaceholder-container" data-testid={testId}>
      <input
        className={`${styles.input}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={newValue}
        onChange={onChangeInput}
      />
    </div>
  );
};

export default PlaceholderInput;
