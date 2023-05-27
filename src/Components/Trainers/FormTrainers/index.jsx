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

  const onChargeInput = (e) => {
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
            //firstName="firstName"
            type="text"
            value={trainer.firstName}
            onChange={onChargeInput}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}> Last Name</label>
          <input
            className={styles.input}
            //lastName="lastName"
            type="text"
            value={trainer.lastName}
            onChange={onChargeInput}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>DNI</label>
          <input
            className={styles.input}
            //dni="dni"
            type="number"
            value={trainer.dni}
            onChange={onChargeInput}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Phone</label>
          <input
            className={styles.input}
            //phone="phone"
            type="number"
            value={trainer.phone}
            onChange={onChargeInput}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            //email="email"
            type="text"
            value={trainer.email}
            onChange={onChargeInput}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>City</label>
          <input
            className={styles.input}
            //city="city"
            type="text"
            value={trainer.city}
            onChange={onChargeInput}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Salary</label>
          <input
            className={styles.input}
            //salary="salary"
            type="number"
            value={trainer.salary}
            onChange={onChargeInput}
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
