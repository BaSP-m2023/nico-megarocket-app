import React, { useState } from 'react';
import './error-placeholder-input.css';

const ErrorInput = ({ value, type, error, change, placeholder }) => {
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const inputClassName = `input ${error && !focus ? 'error' : ''}`;

  return (
    <div className="input-container">
      <input
        className={inputClassName}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={change}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default ErrorInput;
