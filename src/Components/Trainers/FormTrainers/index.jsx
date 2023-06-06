import React, { useState } from 'react';
import styles from './form.module.css';
import { ModalConfirm, ModalSuccess } from '../../Shared';
import { ToastError } from '../../Shared';
import { Inputs } from '../../Shared';
import { Button } from '../../Shared';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const FormTrainers = () => {
  const [modalUpdateConfirmOpen, setModalUpdateConfirmOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [toastErrorOpen, setToastErrorOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [inputForm, setInputForm] = useState('');
  const { id } = useParams();
  const locationObject = useLocation();
  const updateData = locationObject.state.params;

  useEffect(() => {
    {
      updateData.mode === 'edit'
        ? setInputForm({
            firstName: updateData.item.firstName,
            lastName: updateData.item.lastName,
            dni: updateData.item.dni,
            phone: updateData.item.phone,
            email: updateData.item.email,
            city: updateData.item.city,
            salary: updateData.item.salary
          })
        : setInputForm({
            firstName: '',
            lastName: '',
            dni: '',
            phone: '',
            email: '',
            city: '',
            salary: ''
          });
    }
  }, []);

  const history = useHistory();

  const trainerBody = {
    method: updateData.mode === 'edit' ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.strungify(inputForm)
  };

  const createTrainer = async (body) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`, body);
      const data = await response.json();
      if (data.error === true) {
        setToastMessage(data.message);
        setToastErrorOpen(true);
      } else {
        setSuccessMessage('A new Trainers has been created successfully.');
        setModalSuccessOpen(true);
        setTimeout(() => {
          history.push('/trainers');
          setModalSuccessOpen(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTrainer = async (id, body) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`, body);
      const data = await response.json();
      if (data.error === true) {
        setToastMessage(data.message);
        setToastErrorOpen(true);
      } else {
        setSuccessMessage('The Trainer selected has been updated successfully.');
        setModalSuccessOpen(true);
        setTimeout(() => {
          history.push('/trainers');
          setModalSuccessOpen(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateButtonClick = () => {
    setModalUpdateConfirmOpen(true);
  };

  const handleModalConfirmation = () => {
    updateTrainer(id, trainerBody);
    setModalUpdateConfirmOpen(false);
  };

  const onChangeInput = (e) => {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();

    if (updateData.mode === 'edit') {
      handleUpdateButtonClick();
    } else {
      createTrainer(trainerBody);
    }
  };

  return (
    <div>
      <form className={styles.form}>
        <div className={styles.subContainer}>
          <div className={styles.container}>
            <div className={styles.inputContainer}>
              <label className={styles.label}>First Name</label>
              <Inputs
                className={styles.input}
                name="firstName"
                type="text"
                value={inputForm.firstName}
                onChange={onChangeInput}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Last Name</label>
              <Inputs
                className={styles.input}
                name="lastName"
                type="text"
                value={inputForm.lastName}
                onChange={onChangeInput}
              />
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.inputContainer}>
              <label className={styles.label}>DNI</label>
              <Inputs
                className={styles.input}
                name="dni"
                type="number"
                value={inputForm.dni}
                onChange={onChangeInput}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Phone</label>
              <Inputs
                className={styles.input}
                name="phone"
                type="number"
                value={inputForm.phone}
                onChange={onChangeInput}
              />
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Email</label>
              <Inputs
                className={styles.input}
                name="email"
                type="text"
                value={inputForm.email}
                onChange={onChangeInput}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>City</label>
              <Inputs
                className={styles.input}
                name="city"
                type="text"
                value={inputForm.city}
                onChange={onChangeInput}
              />
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Salary</label>
              <Inputs
                className={styles.input}
                name="salary"
                type="number"
                value={inputForm.salary}
                onChange={onChangeInput}
              />
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <Button clickAction={() => history.goBack()} text="Cancel" />
          <Button clickAction={formSubmit} text="Save" />
        </div>
      </form>
      {modalUpdateConfirmOpen && (
        <ModalConfirm
          method="Update"
          onConfirm={handleModalConfirmation}
          setModalConfirmOpen={setModalUpdateConfirmOpen}
          message="Are you sure you want to update this Trainer?"
        />
      )}
      <div>
        {modalSuccessOpen && (
          <ModalSuccess message={successMessage} setModalSuccessOpen={setModalSuccessOpen} />
        )}
      </div>
      {toastErrorOpen && <ToastError setToastErroOpen={setToastErrorOpen} message={toastMessage} />}
    </div>
  );
};

export default FormTrainers;
