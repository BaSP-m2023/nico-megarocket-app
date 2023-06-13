import React, { useState } from 'react';
import styles from './form.module.css';
import { ModalConfirm, ModalSuccess } from '../../Shared';
import { ToastError } from '../../Shared';
import { Inputs } from '../../Shared';
import { Button } from '../../Shared';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { createTrainer, updateTrainer } from '../../../redux/trainers/thunks';
import { useDispatch, useSelector } from 'react-redux';

const FormTrainer = () => {
  const [modalUpdateConfirmOpen, setModalUpdateConfirmOpen] = useState(false);
  const [toastErrorOpen, setToastErrorOpen] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [inputForm, setInputForm] = useState('');
  const { id } = useParams();
  const location = useLocation();
  const updateData = location.state.params;
  const dispatch = useDispatch();
  const isError = useSelector((store) => store.trainers.formError);

  useEffect(() => {
    if (updateData.mode === 'edit') {
      setEditMode(true);
      setInputForm({
        firstName: updateData.firstName,
        lastName: updateData.lastName,
        dni: updateData.dni,
        phone: updateData.phone,
        email: updateData.email,
        city: updateData.city,
        salary: updateData.salary
      });
    } else {
      setInputForm({
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

  useEffect(() => {
    setToastErrorOpen(!!isError);
  }, [isError]);

  const history = useHistory();

  const trainerBody = {
    method: updateData.mode === 'edit' ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputForm)
  };

  const handleUpdateButtonClick = () => {
    setModalUpdateConfirmOpen(true);
  };

  const onChangeInputFirstName = (e) => {
    setInputForm({
      ...inputForm,
      firstName: e.target.value
    });
  };

  const onChangeInputLastName = (e) => {
    setInputForm({
      ...inputForm,
      lastName: e.target.value
    });
  };

  const onChangeInputDni = (e) => {
    setInputForm({
      ...inputForm,
      dni: e.target.value
    });
  };

  const onChangeInputPhone = (e) => {
    setInputForm({
      ...inputForm,
      phone: e.target.value
    });
  };

  const onChangeInputEmail = (e) => {
    setInputForm({
      ...inputForm,
      email: e.target.value
    });
  };

  const onChangeInputCity = (e) => {
    setInputForm({
      ...inputForm,
      city: e.target.value
    });
  };

  const onChangeInputSalary = (e) => {
    setInputForm({
      ...inputForm,
      salary: e.target.value
    });
  };

  const openModal = () => {
    setModalUpdateConfirmOpen(true);
  };

  const formSubmit = async () => {
    if (editMode) {
      handleUpdateButtonClick();
      const updatedTrainer = await dispatch(updateTrainer((id, trainerBody)));
      if (updatedTrainer.type === 'UPDATE_TRAINER') {
        setToastErrorOpen(false);
        setModalSuccess(true);
        setTimeout(() => {
          history.goBack();
        }, 1000);
      }
    } else {
      const postTrainer = await dispatch(createTrainer(trainerBody));
      console.log(postTrainer);
      if (postTrainer.type === 'ADD_TRAINER') {
        console.log('Entro al if');
        setModalSuccess(true);
        setTimeout(() => {
          history.goBack();
        }, 1000);
      }
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
                text={inputForm.firstName}
                change={onChangeInputFirstName}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Last Name</label>
              <Inputs
                className={styles.input}
                name="lastName"
                type="text"
                text={inputForm.lastName}
                change={onChangeInputLastName}
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
                text={inputForm.dni}
                change={onChangeInputDni}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>Phone</label>
              <Inputs
                className={styles.input}
                name="phone"
                type="number"
                text={inputForm.phone}
                change={onChangeInputPhone}
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
                text={inputForm.email}
                change={onChangeInputEmail}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>City</label>
              <Inputs
                className={styles.input}
                name="city"
                type="text"
                text={inputForm.city}
                change={onChangeInputCity}
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
                text={inputForm.salary}
                change={onChangeInputSalary}
              />
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <Button clickAction={() => history.goBack()} text="Cancel" />
          <Button clickAction={openModal} text="Save" />
        </div>
      </form>

      {modalUpdateConfirmOpen && (
        <ModalConfirm
          method={editMode ? 'Edit' : 'Create'}
          message={
            editMode
              ? 'Are you sure you want to edit the Trainer?'
              : 'Are you sure you want to add the Trainer?'
          }
          onConfirm={formSubmit}
          setModalConfirmOpen={setModalUpdateConfirmOpen}
        />
      )}
      {modalSuccess && (
        <ModalSuccess setModalSuccessOpen={setModalSuccess} message="Trainer added successfully" />
      )}
      {toastErrorOpen && (
        <ToastError setToastErroOpen={setToastErrorOpen} message={isError.message} />
      )}
    </div>
  );
};

export default FormTrainer;
