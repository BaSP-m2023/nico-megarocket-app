import React, { useState, useEffect } from 'react';
import { ModalConfirm, Inputs, Button, ModalSuccess } from '../../Shared';
import styles from './form.module.css';
import { useHistory, useParams, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { addSuperAdmin } from '../../../redux/superAdmins/thunks';
import { useDispatch } from 'react-redux';

const Form = () => {
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [modalSuccessConfirmOpen, setModalSuccessConfirmOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editMode, setEditMode] = useState(false);

  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const { params } = location.state;
  const dispatch = useDispatch();

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
      setEditMode(true);
    }
  }, []);

  const updateItem = async (updatedItem) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/super-admin/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedItem)
      });
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
      try {
        addSuperAdmin(dispatch, inputValue);
        setModalSuccessOpen('true');
      } catch (error) {
        console.error(error);
      }
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
      <Button clickAction={onSubmit} text="Submit" />
      <Button
        clickAction={(e) => {
          e.preventDefault();
          history.push('/super-admins/');
        }}
        text="Cancel"
      />
      {modalSuccessConfirmOpen && (
        <ModalConfirm
          method={editMode ? 'Edit' : 'Create'}
          message={
            editMode
              ? 'Are you sure you want to edit the Super Admin?'
              : 'Are you sure you want to add the Super Admin?'
          }
          onConfirm={handleModalConfirmation}
          setModalConfirmOpen={setModalSuccessConfirmOpen}
        />
      )}
      {modalSuccessOpen && (
        <ModalSuccess
          setModalSuccessOpen={setModalSuccessOpen}
          message={
            editMode ? 'Super Admin edited successfully' : 'Super Admin created successfully'
          }
        />
      )}
    </form>
  );
};

export default Form;
