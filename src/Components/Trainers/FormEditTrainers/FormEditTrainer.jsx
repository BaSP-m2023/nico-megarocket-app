import React, { useState } from 'react';
import styles from './form.module.css';

const FormEdit = ({ trainerModify, closeForm }) => {
  // eslint-disable-next-line no-unused-vars
  const [trainerEdited, setTrainer] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    salary: ''
  });

  const editTrainer = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/trainer/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(trainerEdited)
      });
    } catch (error) {
      console.error(error);
    }
    console.log(id);
    console.log(trainerModify._id);
    console.log(trainerEdited);
    console.log(trainerEdited._id);
  };

  const onChargeInput = (e) => {
    const { name, value } = e.target;
    setTrainer((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editTrainer(trainerModify._id);
    setTrainer({
      firstName: '',
      lastName: '',
      dni: '',
      phone: '',
      email: '',
      city: '',
      salary: ''
    });
    closeForm();
    window.location.reload();
  };

  const formClose = (e) => {
    e.preventDefault();
    closeForm();
  };

  return (
    <form className={styles.form}>
      <div className={styles.subContainer}>
        <div className={styles.container}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>First Name</label>
            <input
              className={styles.input}
              name="firstName"
              type="text"
              placeholder={trainerModify.firstName}
              value={trainerEdited.firstName}
              onChange={onChargeInput}
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Last Name</label>
            <input
              className={styles.input}
              name="lastName"
              type="text"
              //placeholder={trainerModify.lastName}
              //value={trainerEdited.lastName}
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
              //placeholder={trainerModify.dni}
              //value={trainerEdited.dni}
              onChange={onChargeInput}
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Phone</label>
            <input
              className={styles.input}
              name="phone"
              type="number"
              //placeholder={trainerModify.phone}
              //value={trainerEdited.phone}
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
              //placeholder={trainerModify.email}
              //value={trainerEdited.email}
              onChange={onChargeInput}
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>City</label>
            <input
              className={styles.input}
              name="city"
              type="text"
              //placeholder={trainerModify.city}
              //value={trainerEdited.city}
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
              //placeholder={trainerModify.salary}
              //value={trainerEdited.salary}
              onChange={onChargeInput}
            />
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <button className={styles.buttonCancel} onClick={formClose}>
          Cancel
        </button>
        <button className={styles.buttonSave} type="submit" onClick={onSubmit}>
          Save
        </button>
      </div>
    </form>
  );
};

export default FormEdit;
