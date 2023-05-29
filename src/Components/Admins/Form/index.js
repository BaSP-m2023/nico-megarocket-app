import React, { useState } from 'react';
import styles from './form.module.css';

const Form = ({ addAdmin, closedForm }) => {
  const [admin, setAdmin] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    dni: '',
    password: ''
  });

  const addAdmins = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(admin)
      });
    } catch (error) {
      console.error(error);
    }
    console.log(admin);
  };

  const onChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addAdmin(admin);
    setAdmin({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      city: '',
      dni: '',
      password: ''
    });
    addAdmins();
  };

  const closeForm = () => {
    closedForm();
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.subContainer}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Name</label>
          <input
            className={styles.input}
            name="firstName"
            type="text"
            value={admin.firstName}
            onChange={onChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Last Name</label>
          <input
            className={styles.input}
            name="lastName"
            type="text"
            value={admin.lastName}
            onChange={onChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>DNI</label>
          <input
            className={styles.input}
            name="dni"
            type="text"
            value={admin.dni}
            onChange={onChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Phone</label>
          <input
            className={styles.input}
            name="phone"
            type="text"
            value={admin.phone}
            onChange={onChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            name="email"
            type="text"
            value={admin.email}
            onChange={onChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>City</label>
          <input
            className={styles.input}
            name="city"
            type="text"
            value={admin.city}
            onChange={onChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            name="password"
            type="password"
            value={admin.password}
            onChange={onChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Repeat Password</label>
          <input
            className={styles.input}
            name="repeatPassword"
            type="password"
            value={admin.repeatPassword}
            // onChange={onChange}
          />
        </div>
      </div>
      <button className={styles.button} type="submit">
        Add
      </button>
      <button className={styles.button} type="submit" onClick={closeForm}>
        Close
      </button>
    </form>
  );
};

export default Form;
