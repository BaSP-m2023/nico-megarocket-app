import React, { useState, useEffect } from 'react';
import { ModalConfirm, Inputs, Button, ModalSuccess, Loader, ToastError } from '../../Shared';
import styles from './form.module.css';
import { useHistory, /*useParams,*/ useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { addSuperAdmin } from '../../../redux/superAdmins/thunks';
import { useDispatch, useSelector } from 'react-redux';

const Form = () => {
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [toastErrorOpen, setToastErrorOpen] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [inputValue, setInputValue] = useState({
    email: '',
    password: ''
  });

  const location = useLocation();
  const history = useHistory();
  // const { id } = useParams();
  const { params } = location.state;

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.superAdmin.loading);
  const anError = useSelector((state) => state.superAdmin.error);
  // console.log(anError);
  useEffect(() => {
    if (params.mode === 'create') {
      setInputValue({
        email: '',
        password: ''
      });
      setEditMode(false);
    } else {
      setInputValue({
        email: params.email,
        password: params.password
      });
      setEditMode(true);
    }
  }, []);

  useEffect(() => {
    setToastErrorOpen(!!anError);
  }, [anError]);

  // const updateItem = async (updatedItem) => {
  //   try {
  //     await fetch(`${process.env.REACT_APP_API_URL}/api/super-admin/${id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(updatedItem)
  //     });
  //     setModalSuccessOpen('true');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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

  // const handleModalConfirmation = () => {
  //   updateItem(inputValue);
  //   setModalConfirmOpen(false);
  // };

  const openModal = (e) => {
    e.preventDefault();
    setModalConfirmOpen(true);
  };
  const confirmation = () => {
    setModalSuccessOpen(true);
    setTimeout(() => {
      history.goBack();
    }, 2000);
  };

  const onSubmit = () => {
    if (!editMode) {
      setModalConfirmOpen(false);
      addSuperAdmin(dispatch, inputValue);
      if (anError) {
        confirmation();
      }
    } else {
      setModalConfirmOpen(false);
      console.log('testin');
      confirmation();
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
      <Button clickAction={openModal} text="Submit" />
      <Button
        clickAction={(e) => {
          e.preventDefault();
          history.goBack();
        }}
        text="Cancel"
      />
      {modalConfirmOpen && (
        <ModalConfirm
          method={editMode ? 'Edit' : 'Create'}
          message={
            editMode
              ? 'Are you sure you want to edit the Super Admin?'
              : 'Are you sure you want to add the Super Admin?'
          }
          onConfirm={onSubmit}
          setModalConfirmOpen={setModalConfirmOpen}
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
      {toastErrorOpen && <ToastError setToastErroOpen={setToastErrorOpen} message={anError} />}
      {isLoading && <Loader />}
    </form>
  );
};

export default Form;
