import React, { useState } from 'react';
import styles from './form.module.css';
import ModalConfirm from '../../Modals/ModalConfirm';
import ModalSuccess from '../../Modals/ModalSuccess';

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

  const [modalConfirmAdd, setModalConfirmAdd] = useState(false);
  const [modalSucessOpen, setModalSucessOpen] = useState(false);

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

  const addTrainer = async (trainer) => {
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

  const onChangeInput = (e) => {
    setTrainer({
      ...trainer,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setModalConfirmAdd(false);
    console.log(validateForm());
    if (validateForm()) {
      addTrainer(trainer);
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
      setModalSucessOpen(true);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setModalConfirmAdd(true);
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
    <div>
      <form className={styles.form}>
        <div className={styles.subContainer}>
          <div className={styles.container}>
            <div className={styles.inputContainer}>
              <label className={styles.label}>First Name</label>
              <input
                className={styles.input}
                name="firstName"
                type="text"
                value={trainer.firstName}
                onChange={onChangeInput}
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
                onChange={onChangeInput}
              />
              {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
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
                onChange={onChangeInput}
              />
              {errors.dni && <span className={styles.error}>{errors.dni}</span>}
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Phone</label>
              <input
                className={styles.input}
                name="phone"
                type="number"
                value={trainer.phone}
                onChange={onChangeInput}
              />
              {errors.phone && <span className={styles.error}>{errors.phone}</span>}
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
                onChange={onChangeInput}
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>City</label>
              <input
                className={styles.input}
                name="city"
                type="text"
                value={trainer.city}
                onChange={onChangeInput}
              />
              {errors.city && <span className={styles.error}>{errors.city}</span>}
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
                onChange={onChangeInput}
              />
              {errors.salary && <span className={styles.error}>{errors.salary}</span>}
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <button className={styles.buttonCancel} onClick={formClose}>
            Cancel
          </button>
          <button className={styles.buttonAdd} type="submit" onClick={handleClick}>
            Add trainer
          </button>
        </div>
      </form>
      {modalConfirmAdd && (
        <ModalConfirm
          onConfirm={onSubmit}
          method="add"
          message="Are you sure to add a new trainer?"
          setModalConfirmOpen={setModalConfirmAdd}
        />
      )}
      {modalSucessOpen && (
        <ModalSuccess message="Trainer added" setModalSuccessOpen={setModalSucessOpen} />
      )}
    </div>
  );
};

export default Form;
