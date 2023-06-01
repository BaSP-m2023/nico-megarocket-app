import React, { useState } from 'react';
import styles from './form.module.css';

const Form = ({ addItem }) => {
  const [trainer, setTrainer] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    salary: ''
  });

  const onChangeInput = (e) => {
    setTrainer({
      ...trainer,
      [e.target.value]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addItem(trainer);
    setTrainer({
      firstName: '',
      lastName: '',
      dni: '',
      phone: '',
      email: '',
      city: '',
      salary: ''
    });
  };

  return (
    <form className={styles.form}>
      <div className={styles.subContainer}>
        <div className={styles.inputContainer}>
          <label className={styles.label}> First Name</label>
          <input
            className={styles.input}
            type="text"
            value={trainer.firstName}
            onChange={onChangeInput}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}> Last Name</label>
          <input
            className={styles.input}
            type="text"
            value={trainer.lastName}
            onChange={onChangeInput}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>DNI</label>
          <input
            className={styles.input}
            type="number"
            value={trainer.dni}
            onChange={onChangeInput}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Phone</label>
          <input
            className={styles.input}
            type="number"
            value={trainer.phone}
            onChange={onChangeInput}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="text"
            value={trainer.email}
            onChange={onChangeInput}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>City</label>
          <input
            className={styles.input}
            type="text"
            value={trainer.city}
            onChange={onChangeInput}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Salary</label>
          <input
            className={styles.input}
            type="number"
            value={trainer.salary}
            onChange={onChangeInput}
          />
        </div>
      </div>
      <button className={styles.button} type="submit" onClick={onSubmit}>
        Add trainer
      </button>
    </form>
  );
};

export default Form;
