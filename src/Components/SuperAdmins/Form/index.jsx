import styles from './form.module.css';
import React, { useState, useEffect } from 'react';
import { ModalConfirm, Inputs, Button, ModalSuccess, Loader, ToastError } from 'Components/Shared';
import { useHistory, useParams, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { addSuperAdmin, updateSuperAdmin } from 'redux/superAdmins/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const schema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({
      'string.base': 'The email must be a text string',
      'string.empty': 'The email is a required field',
      'string.email': 'The email must be a valid email address',
      'string.minDomainSegments': 'The email must have at least 2 domain segments',
      'string.tlds.allow': 'The email must have a valid top-level domain (.com or .net)'
    }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    .required()
    .messages({
      'string.pattern.base':
        'The password must contain at least one lowercase letter, one uppercase letter, and one digit',
      'string.min': 'The password must be at least 8 characters long',
      'string.empty': 'The password field is required'
    })
});

const Form = () => {
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [toastErrorOpen, setToastErrorOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [supAdm, setSupAdm] = useState({});

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
    reset,
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

  const confirmation = () => {
    setModalSuccessOpen(true);
    setTimeout(() => {
      history.goBack();
    }, 2000);
  };

  const openModal = async (data) => {
    setModalConfirmOpen(true);
    setSupAdm(data);
  };

  const onSubmit = async () => {
    if (!editMode) {
      setModalConfirmOpen(false);
      const postSupAdmin = await dispatch(addSuperAdmin(supAdm));
      if (postSupAdmin.type === 'POST_SUPERADMIN_SUCCESS') {
        confirmation();
      }
    } else {
      setModalConfirmOpen(true);
      const putSupAdmin = await dispatch(updateSuperAdmin(supAdm, id));
      if (putSupAdmin.type === 'PUT_SUPERADMIN_SUCCESS') {
        confirmation();
      }
    }
  };

  return (
    <form className={styles.formSuperAdmin} onSubmit={handleSubmit(openModal)}>
      <div className={styles.wholeContainer}>
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
          <Button clickAction={() => {}} text="Submit" />
          <Button clickAction={() => reset()} text="Reset" />
          <Button
            clickAction={(e) => {
              e.preventDefault();
              history.goBack();
            }}
            text="Cancel"
          />
        </div>
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
