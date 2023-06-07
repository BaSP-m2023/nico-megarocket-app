import React, { useState, useEffect } from 'react';
import { ModalConfirm, Inputs, Button, ModalSuccess } from '../../Shared';
import styles from './form.module.css';
import { useHistory, useParams, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const Form = () => {
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [modalSuccessConfirmOpen, setModalSuccessConfirmOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [inputValue, setInputValue] = useState('');
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const { params } = location.state;

  useEffect(() => {
    if (params.mode === 'create') {
      setInputValue({
        email: '',
        password: ''
      });
    } else {
      setInputValue({
        email: params.email,
        password: params.password
      });
    }
  }, []);

  const addItem = async ({ email, password }) => {
    try {
      const newSuperAdmin = {
        email,
        password
      };
      await fetch(`${process.env.REACT_APP_API_URL}/api/super-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSuperAdmin)
      });
      setSuccessMessage('Super Admin added successfully');
      setModalSuccessOpen('true');
    } catch (error) {
      console.error(error);
    }
  };
  const updateItem = async (updatedItem) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/super-admin/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedItem)
      });
      setSuccessMessage('Super Admin updated successfully');
      setModalSuccessOpen('true');
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeInputEmail = (e) => {
    setInputValue({
      ...inputValue,
      email: e.target.value
    });
  };
  const onChangeInputPassword = (e) => {
    setInputValue({
      ...inputValue,
      password: e.target.value
    });
  };

  const handleUpdateButtonClick = () => {
    setModalSuccessConfirmOpen(true);
  };
  const handleModalConfirmation = () => {
    updateItem(inputValue);
    setModalSuccessConfirmOpen(false);
  };

  const onSubmit = () => {
    if (params.mode === 'create') {
      addItem(inputValue);
    } else {
      handleUpdateButtonClick();
    }
  };

  return (
    <form className={styles.formSuperAdmin}>
      <Inputs
        text={inputValue.email}
        type="text"
        change={onChangeInputEmail}
        nameInput={'email'}
        nameTitle={'Email'}
      />
      <Inputs
        text={inputValue.password}
        type="text"
        change={onChangeInputPassword}
        nameInput={'password'}
        nameTitle={'Password'}
      />
      <Button clickAction={onSubmit} text={'Submit'} />
      <Button clickAction={() => history.goBack()} text={'Cancel'} />
      {modalSuccessConfirmOpen && (
        <ModalConfirm
          method="Update"
          onConfirm={handleModalConfirmation}
          setModalConfirmOpen={setModalSuccessConfirmOpen}
          message="Are you sure you want to update this?"
        />
      )}
      {modalSuccessOpen && (
        <ModalSuccess setModalSuccessOpen={setModalSuccessOpen} message={successMessage} />
      )}
    </form>
  );
};

export default Form;
