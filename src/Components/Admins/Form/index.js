import React, { /* useEffect,  */ useState } from 'react';
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
  /*   const [editMode, setEditMode] = useState(false); */
  const [inputValue, setInputValue] = useState('');
  const [toastErroOpen, setToastErroOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('Error in database');
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();
  const data = location.state.params;
  const dispatch = useDispatch();

  const schema = Joi.object({
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
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
    repeatPassword: Joi.string().valid(Joi.ref('password'))
  });

  const adminUpdated = {
    firstName: data.firstName,
    lastName: data.lastName,
    dni: data.dni,
    phone: data.phone,
    email: data.email,
    city: data.city,
    password: data.password,
    repeatPassword: data.password
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

  /*  useEffect(() => {
    if (data.mode === 'create') {
      setEditMode(false);
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
      setEditMode(true);
    }
  }, []); */

  // const pass = watch('password');

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
      history.push('/admins/');
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
    const newAdmin = {
      firstName: dataAdmin.firstName,
      lastName: dataAdmin.lastName,
      dni: dataAdmin.dni,
      phone: dataAdmin.phone,
      email: dataAdmin.email,
      city: dataAdmin.city,
      password: dataAdmin.password
    };
    setInputValue(newAdmin);
    openModal();
  };

  return (
    <div className={styles.containerForm}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.subContainer}>
          <div className={styles.sub_buttons}>
            <Inputs
              nameTitle="Name"
              register={register}
              nameInput="firstName"
              type="text"
              isDisabled={false}
              error={errors.firstName?.message}
            />
            <Inputs
              nameTitle="LastName"
              register={register}
              nameInput="lastName"
              type="text"
              isDisabled={false}
              error={errors.lastName?.message}
            />
          </div>
          <div className={styles.sub_buttons}>
            <Inputs
              nameTitle="DNI"
              register={register}
              nameInput="dni"
              type="text"
              isDisabled={false}
              error={errors.dni?.message}
            />
            <Inputs
              nameTitle="Phone"
              register={register}
              nameInput="phone"
              type="text"
              isDisabled={false}
              error={errors.phone?.message}
            />
          </div>
          <div className={styles.sub_buttons}>
            <Inputs
              nameTitle="E-Mail"
              register={register}
              nameInput="email"
              type="email"
              isDisabled={false}
              error={errors.email?.message}
            />
            <Inputs
              nameTitle="City"
              register={register}
              nameInput="city"
              type="text"
              isDisabled={false}
              error={errors.city?.message}
            />
          </div>
          <div className={styles.sub_buttons}>
            <Inputs
              nameTitle="Password"
              register={register}
              nameInput="password"
              type="password"
              isDisabled={false}
              error={errors.password?.message}
            />
            <Inputs
              nameTitle="Repeat Password"
              register={register}
              nameInput="repeatPassword"
              type="password"
              isDisabled={false}
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
          method={id ? 'Edit' : 'Create'}
          message={
            id
              ? 'Are you sure you want to edit the admin?'
              : 'Are you sure you want to add the admin?'
          }
          onConfirm={submitAdmin}
          setModalConfirmOpen={setModalConfirmOpen}
        />
      )}
      {modalSuccessOpen && (
        <ModalSuccess
          message={id ? 'Admin edited successfully' : 'Admin created successfully'}
          setModalSuccessOpen={setModalSuccessOpen}
        />
      )}
      {toastErroOpen && <ToastError setToastErroOpen={setToastErroOpen} message={toastMessage} />}
    </div>
  );
};

export default FormAdmin;
