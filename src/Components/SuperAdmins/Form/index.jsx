import React, { useState, useEffect } from 'react';
import { ModalConfirm, Inputs, Button, ModalSuccess, Loader, ToastError } from '../../Shared';
import styles from './form.module.css';
import { useHistory, useParams, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { /* addSuperAdmin,*/ updateSuperAdmin } from '../../../redux/superAdmins/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const schema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    .required()
    .messages({
      'string.pattern.base':
        'The password must contain at least one lowercase letter, one uppercase letter, and one digit'
    })
});

const Form = () => {
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [toastErrorOpen, setToastErrorOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // const [inputValue, setInputValue] = useState({
  //   email: '',
  //   password: ''
  // });

  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const { params } = location.state;

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.superAdmin.loading);
  const anError = useSelector((state) => state.superAdmin.error);

  const editSupAdm = {
    email: params.email,
    password: params.password
  };
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      ...editSupAdm
    }
  });

  useEffect(() => {
    if (params.mode === 'create') {
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  }, []);

  useEffect(() => {
    setToastErrorOpen(!!anError);
  }, [anError]);

  // const onChangeInputEmail = (e) => {
  //   setInputValue({
  //     ...inputValue,
  //     email: e.target.value
  //   });
  // };
  // const onChangeInputPassword = (e) => {
  //   setInputValue({
  //     ...inputValue,
  //     password: e.target.value
  //   });
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

  const onSubmit = async (data) => {
    if (!editMode) {
      // setModalConfirmOpen(false);
      // const postSupAdmin = await dispatch(addSuperAdmin(data));
      // if (postSupAdmin.type === 'POST_SUPERADMIN_SUCCESS') {
      //   confirmation();
      // }
      console.log(data);
    } else {
      setModalConfirmOpen(false);
      const putSupAdmin = await dispatch(updateSuperAdmin(data, id));
      if (putSupAdmin.type === 'PUT_SUPERADMIN_SUCCESS') {
        confirmation();
      }
    }
  };

  return (
    <form className={styles.formSuperAdmin} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.containerForm}>
        <Inputs
          type="email"
          nameInput={'email'}
          nameTitle={'Email'}
          register={register}
          error={errors.email?.message}
        />
        <Inputs
          type="password"
          nameInput={'password'}
          nameTitle={'Password'}
          register={register}
          error={errors.password?.message}
        />
      </div>
      <div className={styles.sub_buttons}>
        <Button clickAction={openModal} text="Submit" />
        <Button
          clickAction={(e) => {
            e.preventDefault();
            history.goBack();
          }}
          text="Cancel"
        />
      </div>

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
