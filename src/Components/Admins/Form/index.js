import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import { ModalConfirm, ToastError, ModalSuccess, Inputs, Button } from '../../Shared';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { createAdmin, updateAdmin } from '../../../redux/admins/thunks';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const FormAdmin = () => {
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [repeatPass, setRepeatPass] = useState('');
  const [toastErroOpen, setToastErroOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('Error in database');
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();
  const data = location.state.params;
  const dispatch = useDispatch();

  const schema = Joi.object({
    firstName: Joi.string().min(3).max(15),
    lastName: Joi.string().min(3).max(15),
    dni: Joi.number().min(10000000).max(99999999),
    phone: Joi.string().min(9).max(12),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    city: Joi.string().min(2).max(10),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  });

  const adminUpdated = {
    firstName: data.item.firstName,
    lastName: data.item.lastName,
    dni: data.item.dni,
    phone: data.item.phone,
    email: data.item.email,
    city: data.item.city,
    password: data.item.password
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: {
      ...adminUpdated
    }
  });

  useEffect(() => {
    if (data.mode === 'create') {
      /* setInputValue({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        city: '',
        dni: '',
        password: ''
      }); */
    } else {
      /* setInputValue({
        firstName: data.item.firstName,
        lastName: data.item.lastName,
        phone: data.item.phone,
        email: data.item.email,
        city: data.item.city,
        dni: data.item.dni,
        password: data.item.password
      }); */
      setRepeatPass(data.item.password);
      setEditMode(true);
    }
  }, []);

  const addAdmins = async () => {
    try {
      createAdmin(dispatch, inputValue);
      if (!data.error) {
        if (validatePasswords()) {
          confirmation();
        } else {
          setModalConfirmOpen(false);
          setToastErroOpen(true);
          setToastMessage('Passwords must match ');
        }
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
        if (validatePasswords()) {
          confirmation();
          setModalSuccessOpen(true);
        } else {
          setModalConfirmOpen(false);
          setToastErroOpen(true);
          setToastMessage('Passwords must match ');
        }
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
    if (!editMode) {
      setModalConfirmOpen(false);
      addAdmins();
    } else {
      setModalConfirmOpen(false);
      addEditAdmins();
    }
  };

  const handleInputChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };
  const handleRepeatPasswordChange = (e) => {
    const { value } = e.target;
    setRepeatPass(value);
  };

  const onSubmit = (data) => {
    console.log(data);
    openModal();
  };

  return (
    <div className={styles.containerForm}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.subContainer}>
          <div className={styles.sub_buttons}>
            <Inputs
              register={register}
              text={inputValue.firstName}
              type="text"
              nameTitle="Name"
              isDisabled={false}
              change={handleInputChange}
              nameInput="firstName"
              error={errors.firstName?.message}
            />
            <Inputs
              register={register}
              type="text"
              nameTitle="Last Name"
              isDisabled={false}
              nameInput="lastName"
              error={errors.lastName?.message}
            />
          </div>
          <div className={styles.sub_buttons}>
            <Inputs
              register={register}
              type="text"
              nameTitle="DNI"
              isDisabled={false}
              nameInput="dni"
              error={errors.dni?.message}
            />
            <Inputs
              register={register}
              type="text"
              nameTitle="Phone"
              isDisabled={false}
              nameInput="phone"
              error={errors.phone?.message}
            />
          </div>
          <div className={styles.sub_buttons}>
            <Inputs
              register={register}
              type="email"
              nameTitle="E-Mail"
              isDisabled={false}
              nameInput="email"
              error={errors.email?.message}
            />
            <Inputs
              register={register}
              type="text"
              nameTitle="City"
              isDisabled={false}
              nameInput="city"
              error={errors.city?.message}
            />
          </div>
          <div className={styles.sub_buttons}>
            <Inputs
              register={register}
              text={inputValue.password}
              type="password"
              nameTitle="Password"
              isDisabled={false}
              change={handleInputChange}
              nameInput="password"
              error={errors.password?.message}
            />
            <Inputs
              register={register}
              type="password"
              nameTitle="Repeat Password"
              isDisabled={false}
              change={handleRepeatPasswordChange}
              nameInput="repeat-password"
              error={errors.repeatPassword?.message}
            />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Button text="Save" clickAction={() => {}} />
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
