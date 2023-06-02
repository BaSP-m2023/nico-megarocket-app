import React, { useState } from 'react';
import styles from './form.module.css';
import ModalConfirm from '../../Modals/ModalConfirm';
import ModalSuccess from '../../Modals/ModalSuccess';

const FormEdit = ({ trainerModify, closeForm, setTrainers, trainers }) => {
  const [trainerEdited, setTrainer] = useState({
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

  const editTrainer = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/trainer/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(trainerEdited)
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error(error);
    }
  };

  const onChargeInput = (e) => {
    const { name, value } = e.target;
    setTrainer((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setModalConfirmAdd(false);
    const edTrainer = await editTrainer(trainerModify._id);
    const updatedTrainers = [...trainers];
    const index = updatedTrainers.findIndex((trainer) => trainer._id === edTrainer._id);
    if (index !== -1) {
      updatedTrainers[index] = edTrainer;
      setTrainers(updatedTrainers);
    }
    console.log(edTrainer);
    console.log(trainers);
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
    closeForm();
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

    if (trainerEdited.firstName.trim() === '') {
      othersErrors.firstName = 'First Name is required';
    }

    if (trainerEdited.lastName.trim() === '') {
      othersErrors.lastName = 'Last Name is required';
    }

    if (trainerEdited.dni.trim() === '') {
      othersErrors.dni = 'DNI is required';
    }

    if (trainerEdited.phone.trim() === '') {
      othersErrors.phone = 'Phone is required';
    }

    if (trainerEdited.email.trim() === '') {
      othersErrors.email = 'Email is required';
    }

    if (trainerEdited.city.trim() === '') {
      othersErrors.city = 'City is required';
    }

    if (trainerEdited.salary.trim() === '') {
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
                placeholder={trainerModify.firstName}
                value={trainerEdited.firstName}
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
                placeholder={trainerModify.lastName}
                value={trainerEdited.lastName}
                onChange={onChargeInput}
                onBlur={handleBlur}
              />
              {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.inputContainer}>
              <label className={styles.label}>DNI</label>
              <input
                className={styles.input}
                name="dni"
                type="number"
                placeholder={trainerModify.dni}
                value={trainerEdited.dni}
                onChange={onChargeInput}
                onBlur={handleBlur}
              />
              {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Phone</label>
              <input
                className={styles.input}
                name="phone"
                type="number"
                placeholder={trainerModify.phone}
                value={trainerEdited.phone}
                onChange={onChargeInput}
                onBlur={handleBlur}
              />
              {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Email</label>
              <input
                className={styles.input}
                name="email"
                type="text"
                placeholder={trainerModify.email}
                value={trainerEdited.email}
                onChange={onChargeInput}
                onBlur={handleBlur}
              />
              {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>City</label>
              <input
                className={styles.input}
                name="city"
                type="text"
                placeholder={trainerModify.city}
                value={trainerEdited.city}
                onChange={onChargeInput}
                onBlur={handleBlur}
              />
              {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Salary</label>
              <input
                className={styles.input}
                name="salary"
                type="number"
                placeholder={trainerModify.salary}
                value={trainerEdited.salary}
                onChange={onChargeInput}
                onBlur={handleBlur}
              />
              {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <button className={styles.buttonCancel} onClick={formClose}>
            Cancel
          </button>
          <button className={styles.buttonSave} type="submit" onClick={handleClick}>
            Save
          </button>
        </div>
      </form>
      {modalConfirmAdd && (
        <ModalConfirm
          onConfirm={onSubmit}
          method="edit"
          message="Are you sure to edit this trainer?"
          setModalConfirmOpen={setModalConfirmAdd}
        />
      )}
      {modalSucessOpen && (
        <ModalSuccess message="Trainer edited" setModalSuccessOpen={setModalSucessOpen} />
      )}
    </div>
  );
};

export default FormEdit;
