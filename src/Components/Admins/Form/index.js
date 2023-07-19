import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import { ModalConfirm, ToastError, ModalSuccess, Inputs, Button, Loader } from 'Components/Shared';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { createAdmin, updateAdmin } from 'redux/admins/thunks';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const FormAdmin = () => {
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [toastErroOpen, setToastErroOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('Error in database');
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();
  const data = location.state.params;
  const dispatch = useDispatch();

  const schemaTrainer = () => {
    if (data.mode === 'create') {
      return Joi.object({
        firstName: Joi.string().min(3).max(15).required(),
        lastName: Joi.string().min(3).max(15).required(),
        dni: Joi.number().min(10000000).max(99999999).required(),
        phone: Joi.string().min(9).max(12).required(),
        email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
          .required(),
        city: Joi.string().min(2).max(10).required(),
        password: Joi.string()
          .min(8)
          .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
          .message('The password must have at least one Uppercase,a number and 8 characters.'),
        repeatPassword: Joi.string().valid(Joi.ref('password')).required().messages({
          'any.only': "Passwords don't match"
        })
      });
    } else {
      return Joi.object({
        firstName: Joi.string().min(3).max(15).required(),
        lastName: Joi.string().min(3).max(15).required(),
        dni: Joi.number().min(10000000).max(99999999).required(),
        phone: Joi.string().min(9).max(12).required(),
        email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
          .required(),
        city: Joi.string().min(2).max(10).required()
      });
    }
  };
  const schema = schemaTrainer();

  const adminUpdated = {
    firstName: data.firstName,
    lastName: data.lastName,
    dni: data.dni,
    phone: data.phone,
    email: data.email,
    city: data.city
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: {
      ...adminUpdated
    }
  });

  const addAdmins = async () => {
    try {
      createAdmin(dispatch, inputValue);
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
      updateAdmin(dispatch, id, inputValue);
      if (!data.error) {
        confirmation();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setToastMessage(error.message);
      setToastErroOpen(true);
    }
  };

  const openModal = () => {
    setModalConfirmOpen(true);
  };

  const confirmation = () => {
    setModalSuccessOpen(true);
    setTimeout(() => {
      history.push('/superAdmin/admin');
    }, 2000);
  };

  const submitAdmin = () => {
    if (!id) {
      setModalConfirmOpen(false);
      addAdmins();
    } else {
      setModalConfirmOpen(false);
      addEditAdmins();
    }
  };

  const onSubmit = async (dataAdmin) => {
    if (data.mode === 'create') {
      setInputValue({
        firstName: dataAdmin.firstName,
        lastName: dataAdmin.lastName,
        dni: dataAdmin.dni,
        phone: dataAdmin.phone,
        email: dataAdmin.email,
        city: dataAdmin.city,
        password: dataAdmin.password
      });
    } else {
      setInputValue({
        firstName: dataAdmin.firstName,
        lastName: dataAdmin.lastName,
        dni: dataAdmin.dni,
        phone: dataAdmin.phone,
        email: dataAdmin.email,
        city: dataAdmin.city
      });
    }
    openModal();
  };

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <h3 className={styles.title}>{id ? 'Edit Admin' : 'Add Admin'}</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.form}>
              <div className={styles.groupContainer}>
                <Inputs
                  nameTitle="First name"
                  register={register}
                  nameInput="firstName"
                  type="text"
                  isDisabled={false}
                  error={errors.firstName?.message}
                  testId="input-admin-name"
                />

                <Inputs
                  nameTitle="DNI"
                  register={register}
                  nameInput="dni"
                  type="text"
                  isDisabled={false}
                  error={errors.dni?.message}
                  testId="input-admin-dni"
                />

                <Inputs
                  nameTitle="E-Mail"
                  register={register}
                  nameInput="email"
                  type="email"
                  isDisabled={false}
                  error={errors.email?.message}
                  testId="input-admin-email"
                />
                {!id && (
                  <div>
                    <Inputs
                      nameTitle="Password"
                      register={register}
                      nameInput="password"
                      type="password"
                      isDisabled={false}
                      error={errors.password?.message}
                      testId="input-admin-password"
                    />
                  </div>
                )}
              </div>
              <div className={styles.groupContainer}>
                <Inputs
                  nameTitle="Last name"
                  register={register}
                  nameInput="lastName"
                  type="text"
                  isDisabled={false}
                  error={errors.lastName?.message}
                  testId="input-admin-lastname"
                />

                <Inputs
                  nameTitle="Phone"
                  register={register}
                  nameInput="phone"
                  type="text"
                  isDisabled={false}
                  error={errors.phone?.message}
                  testId="input-admin-phone"
                />

                <Inputs
                  nameTitle="City"
                  register={register}
                  nameInput="city"
                  type="text"
                  isDisabled={false}
                  error={errors.city?.message}
                  testId="input-admin-city"
                />
                {!id && (
                  <div>
                    <Inputs
                      nameTitle="Repeat Password"
                      register={register}
                      nameInput="repeatPassword"
                      type="password"
                      isDisabled={false}
                      error={errors.repeatPassword?.message}
                      testId="input-admin-repeat-password"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <Button text={'Save'} clickAction={() => {}} testId="admin-save-btn" />
              <Button text="Reset" clickAction={() => reset()} testId="admin-reset-btn" />
              <Button
                clickAction={(e) => {
                  e.preventDefault();
                  history.goBack();
                }}
                text="Cancel"
                testId="admin-cancel-btn"
              />
            </div>
          </form>

          {modalConfirmOpen && (
            <ModalConfirm
              method={id ? 'Update' : 'Create'}
              message={
                id
                  ? 'Are you sure you want to update this admin?'
                  : 'Are you sure you want to create this admin?'
              }
              onConfirm={submitAdmin}
              setModalConfirmOpen={setModalConfirmOpen}
              testId="admin-modal-confirm"
            />
          )}
          {modalSuccessOpen && (
            <ModalSuccess
              message={
                id ? 'Admin has been updated succesfully' : 'Admin has been created successfully'
              }
              setModalSuccessOpen={setModalSuccessOpen}
              testId="admin-modal-success"
            />
          )}
          {toastErroOpen && (
            <ToastError
              setToastErroOpen={setToastErroOpen}
              message={toastMessage}
              testId="admin-form-toast-error"
            />
          )}
        </div>
      )}
    </>
  );
};

export default FormAdmin;
