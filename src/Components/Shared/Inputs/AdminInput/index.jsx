import React from 'react';
import styles from './admin-inputs.module.css';

const AdminInput = ({ name, labelTitle, type, value }) => {
  return (
    <div className={styles.admin_input_container}>
      <label htmlFor={name} className={styles.labelText}>
        {labelTitle}
      </label>
      <input type={type} id={name} className={styles.inputBox} value={value} />
    </div>
  );
};

export default AdminInput;
