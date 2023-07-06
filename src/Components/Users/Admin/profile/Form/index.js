import React, { useState } from 'react';
import styles from './profile-form.module.css';
import { Inputs, Button, ModalConfirm, ModalSuccess, ToastError } from 'Components/Shared';
import { updateAdmin } from 'redux/admins/thunks';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const schema = Joi.object({
  firstName: Joi.string().min(3).max(15).required(),
  lastName: Joi.string().min(3).max(15).required(),
  dni: Joi.number().min(10000000).max(99999999).required(),
  phone: Joi.string().min(9).max(12).required(),
  city: Joi.string().min(2).max(10).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
});

const ProfileForm = () => {
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [toastErroOpen, setToastErroOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('Error in database');

  const [adminToEdit, setAdminToEdit] = useState({});

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const adminData = location.state.params;

  const editAdm = {
    firstName: adminData.firstName,
    lastName: adminData.lastName,
    dni: adminData.dni,
    email: adminData.email,
    phone: adminData.phone,
    city: adminData.city
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
      ...editAdm
    }
  });

  const openModal = () => {
    setModalConfirmOpen(true);
  };

  const onSubmit = async (dataAdmin) => {
    const adminEdit = {
      firstName: dataAdmin.firstName,
      lastName: dataAdmin.lastName,
      dni: dataAdmin.dni,
      phone: dataAdmin.phone,
      email: dataAdmin.email,
      city: dataAdmin.city,
      password: dataAdmin.password
    };
    setAdminToEdit(adminEdit);
    openModal();
  };

  const submitAdmin = () => {
    setModalConfirmOpen(false);
    if (Object.keys(errors).length === 0) {
      editAdmins();
    } else {
      setToastMessage('Form validation error');
      setToastErroOpen(true);
    }
  };

  const editAdmins = async () => {
    try {
      updateAdmin(dispatch, id, adminToEdit);
      if (!adminData.error) {
        confirmation();
      } else {
        throw new Error(adminData.message);
      }
    } catch (error) {
      setToastMessage(error.message);
      setToastErroOpen(true);
    }
  };

  const confirmation = () => {
    setModalSuccessOpen(true);
    setTimeout(() => {
      history.push('/admin/profile');
    }, 2000);
  };

  return (
    <div className={styles.containerForm}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.boxInput}>
          <div className={styles.inputForm}>
            <Inputs
              type="text"
              nameInput={'firstName'}
              nameTitle={'Name'}
              register={register}
              error={errors.firstName?.message}
              testId="input-admin-name"
            />
          </div>
          <div className={styles.inputForm}>
            <Inputs
              type="text"
              nameInput={'lastName'}
              nameTitle={'Last Name'}
              register={register}
              error={errors.lastName?.message}
              testId="input-admin-lastname"
            />
          </div>
        </div>
        <div className={styles.boxInput}>
          <div className={styles.inputForm}>
            <Inputs
              type="text"
              nameInput={'dni'}
              nameTitle={'DNI'}
              register={register}
              error={errors.dni?.message}
              testId="input-admin-dni"
            />
          </div>
          <div className={styles.inputForm}>
            <Inputs
              type="text"
              nameInput={'phone'}
              nameTitle={'Phone'}
              register={register}
              error={errors.phone?.message}
              testId="input-admin-phone"
            />
          </div>
        </div>
        <div className={styles.boxInput}>
          <div className={styles.inputForm}>
            <Inputs
              type="text"
              nameInput={'city'}
              nameTitle={'City'}
              register={register}
              error={errors.city?.message}
              testId="input-admin-city"
            />
          </div>
          <div className={styles.inputForm}>
            <Inputs
              type="email"
              nameInput={'email'}
              nameTitle={'E-Mail'}
              register={register}
              error={errors.email?.message}
              testId="input-admin-email"
              isDisabled={id ? 'true' : 'false'}
            />
          </div>
        </div>
        <div className={styles.buttonsBox}>
          <Button clickAction={() => {}} text="Save" testId="admin-save-btn" />
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
          method={'Edit'}
          message={'Are you sure you want to edit the admin?'}
          onConfirm={submitAdmin}
          setModalConfirmOpen={setModalConfirmOpen}
          testId="admin-modal-confirm"
        />
      )}
      {modalSuccessOpen && (
        <ModalSuccess
          message={'Admin edited successfully'}
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
  );
};

export default ProfileForm;
