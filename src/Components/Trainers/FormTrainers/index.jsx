import React, { useState } from 'react';
import styles from './form.module.css';

const Form = ({ addItem, closeForm }) => {
  const [trainer, setTrainer] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    salary: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    salary: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      firstName: '',
      lastName: '',
      dni: '',
      phone: '',
      email: '',
      city: '',
      salary: ''
    };

    if (trainer.firstName.trim() === '') {
      newErrors.firstName = '*First Name is required';
      isValid = false;
    }

    if (trainer.lastName.trim() === '') {
      newErrors.lastName = '*Last Name is required';
      isValid = false;
    }

    if (trainer.dni.trim() === '') {
      newErrors.dni = '*DNI is required';
      isValid = false;
    }

    if (trainer.phone.trim() === '') {
      newErrors.phone = '*Phone is required';
      isValid = false;
    }

    if (trainer.email.trim() === '') {
      newErrors.email = '*Email is required';
      isValid = false;
    }

    if (trainer.city.trim() === '') {
      newErrors.city = '*City is required';
      isValid = false;
    }

    if (trainer.salary.trim() === '') {
      newErrors.city = '*City is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // eslint-disable-next-line no-unused-vars
  const addTrainer = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/trainer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(trainer)
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onChargeInput = (e) => {
    setTrainer({
      ...trainer,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      addTrainer();
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
      setErrors({
        firstName: '',
        lastName: '',
        dni: '',
        phone: '',
        email: '',
        city: '',
        salary: ''
      });
    }
  };

  const formClose = (e) => {
    e.preventDefault();
    closeForm();
  };

  const handleBlur = () => {
    let othersErrors = {};

    if (trainer.firstName.trim() === '') {
      othersErrors.firstName = 'First Name is required';
    }

    if (trainer.lastName.trim() === '') {
      othersErrors.lastName = 'Last Name is required';
    }

    if (trainer.dni.trim() === '') {
      othersErrors.dni = 'DNI is required';
    }

    if (trainer.phone.trim() === '') {
      othersErrors.phone = 'Phone is required';
    }

    if (trainer.email.trim() === '') {
      othersErrors.email = 'Email is required';
    }

    if (trainer.city.trim() === '') {
      othersErrors.city = 'City is required';
    }

    if (trainer.salary.trim() === '') {
      othersErrors.city = 'City is required';
    }

    setErrors(othersErrors);
  };

  return (
    <form className={styles.form}>
      <div className={styles.subContainer}>
        <div className={styles.container}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>First Name</label>
            <input
              className={styles.input} //{styles.inputError}
              name="firstName"
              type="text"
              value={trainer.firstName}
              onChange={onChargeInput}
              onBlur={handleBlur}
            />
            {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Last Name</label>
            <input
              className={styles.input}
              name="lastName"
              type="text"
              value={trainer.lastName}
              onChange={onChargeInput}
            />
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>DNI</label>
            <input
              className={styles.input}
              name="dni"
              type="number"
              value={trainer.dni}
              onChange={onChargeInput}
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Phone</label>
            <input
              className={styles.input}
              name="phone"
              type="number"
              value={trainer.phone}
              onChange={onChargeInput}
            />
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              name="email"
              type="text"
              value={trainer.email}
              onChange={onChargeInput}
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>City</label>
            <input
              className={styles.input}
              name="city"
              type="text"
              value={trainer.city}
              onChange={onChargeInput}
            />
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Salary</label>
            <input
              className={styles.input}
              name="salary"
              type="number"
              value={trainer.salary}
              onChange={onChargeInput}
            />
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <button className={styles.buttonCancel} onClick={formClose}>
          Cancel
        </button>
        <button className={styles.buttonAdd} type="submit" onClick={onSubmit}>
          Add trainer
        </button>
      </div>
    </form>
  );
};

export default Form;
