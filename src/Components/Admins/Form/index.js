import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import { ModalConfirm, ToastError, ModalSuccess, Inputs, Button } from '../../Shared';
import { useParams, useLocation, useHistory } from 'react-router-dom';

const FormAdmin = () => {
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    dni: '',
    password: ''
  });
  const [repeatPass, setRepeatPass] = useState('');
  const [toastErroOpen, setToastErroOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('Error in database');
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);

  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();
  const data = location.state.params;

  useEffect(() => {
    if (data.mode === 'create') {
      setInputValue({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        city: '',
        dni: '',
        password: ''
      });
    } else {
      setInputValue({
        firstName: data.item.firstName,
        lastName: data.item.lastName,
        phone: data.item.phone,
        email: data.item.email,
        city: data.item.city,
        dni: data.item.dni,
        password: data.item.password
      });
      setRepeatPass(data.item.password);
      setEditMode(true);
    }
  }, []);

  const addAdmins = async () => {
    try {
      const resp = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputValue)
      });
      const data = await resp.json();
      if (!data.error) {
        confirmation();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setModalConfirmOpen(false);
      setToastErroOpen(true);
      setToastMessage(error.message);
    }
  };

  const addEditAdmins = async () => {
    try {
      const resp = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputValue)
      });
      const data = await resp.json();
      if (!data.error) {
        confirmation();
        setModalSuccessOpen(true);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setToastMessage(error.message);
      setToastErroOpen(true);
    }
  };

  const openModal = (e) => {
    e.preventDefault();
    setModalConfirmOpen(true);
  };

  const validatePasswords = () => {
    if (inputValue.password === repeatPass) {
      return true;
    } else {
      return false;
    }
  };

  const confirmation = () => {
    setModalSuccessOpen(true);
    setTimeout(() => {
      history.push('/admins/');
    }, 2000);
  };

  const submitAdmin = () => {
    if (validatePasswords()) {
      if (!editMode) {
        setModalConfirmOpen(false);
        addAdmins();
      } else {
        setModalConfirmOpen(false);
        addEditAdmins();
      }
    } else {
      setModalConfirmOpen(false);
      setToastErroOpen(true);
      setToastMessage('Passwords must match ');
    }
  };

  const handleInputChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };
  const handleRepeatPasswordChange = (e) => {
    const { value } = e.target;
    setRepeatPass(value);
  };

  return (
    <div className={styles.containerForm}>
      <form className={styles.form}>
        <div className={styles.subContainer}>
          <Inputs
            text={inputValue.firstName}
            type="text"
            nameTitle="Name"
            isDisabled={false}
            change={handleInputChange}
            nameInput="firstName"
          />

          <Inputs
            text={inputValue.lastName}
            type="text"
            nameTitle="Last Name"
            isDisabled={false}
            change={handleInputChange}
            nameInput="lastName"
          />
          <Inputs
            text={inputValue.dni}
            type="text"
            nameTitle="DNI"
            isDisabled={false}
            change={handleInputChange}
            nameInput="dni"
          />
          <Inputs
            text={inputValue.phone}
            type="text"
            nameTitle="Phone"
            isDisabled={false}
            change={handleInputChange}
            nameInput="phone"
          />
          <Inputs
            text={inputValue.email}
            type="email"
            nameTitle="E-Mail"
            isDisabled={false}
            change={handleInputChange}
            nameInput="email"
          />
          <Inputs
            text={inputValue.city}
            type="text"
            nameTitle="City"
            isDisabled={false}
            change={handleInputChange}
            nameInput="city"
          />
          <Inputs
            text={inputValue.password}
            type="password"
            nameTitle="Password"
            isDisabled={false}
            change={handleInputChange}
            nameInput="password"
          />
          <Inputs
            text={repeatPass}
            type="password"
            nameTitle="Repeat Password"
            isDisabled={false}
            change={handleRepeatPasswordChange}
            nameInput="repeat-password"
          />
        </div>

        <div className={styles.buttonContainer}>
          <Button clickAction={openModal} text="Save" />
          <Button
            clickAction={(e) => {
              e.preventDefault();
              history.push('/admins/');
            }}
            text="Cancel"
          />
        </div>
      </form>
      {modalConfirmOpen && (
        <ModalConfirm
          method={editMode ? 'Edit' : 'Create'}
          message={
            editMode
              ? 'Are you sure you want to edit the admin?'
              : 'Are you sure you want to add the admin?'
          }
          onConfirm={submitAdmin}
          setModalConfirmOpen={setModalConfirmOpen}
        />
      )}
      {modalSuccessOpen && (
        <ModalSuccess
          message={editMode ? 'Admin edited successfully' : 'Admin created successfully'}
          setModalSuccessOpen={setModalSuccessOpen}
        />
      )}
      {toastErroOpen && <ToastError setToastErroOpen={setToastErroOpen} message={toastMessage} />}
    </div>
  );
};

export default FormAdmin;
