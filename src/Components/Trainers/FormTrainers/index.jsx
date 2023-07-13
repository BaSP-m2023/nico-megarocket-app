import React, { useState, useEffect } from 'react';
import styles from './form.module.css';
import { ModalConfirm, ModalSuccess, ToastError, Inputs, Button, Loader } from 'Components/Shared';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { createTrainer, updateTrainer } from 'redux/trainers/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const FormTrainer = () => {
  const [modalUpdateConfirmOpen, setModalUpdateConfirmOpen] = useState(false);
  const [toastErrorOpen, setToastErrorOpen] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [inputForm, setInputForm] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const updateData = location.state.params;
  const dispatch = useDispatch();
  const isError = useSelector((store) => store.trainers.formError);
  const isPending = useSelector((state) => state.trainers.pending);
  const token = sessionStorage.getItem('token');

  const schema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    dni: Joi.number().min(10000000).max(99999999),
    phone: Joi.string().min(9).max(12).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .message('The password must have at least one Uppercase,a number and 8 characters.'),
    repeatPassword: Joi.string().valid(Joi.ref('password')).required().messages({
      'any.only': "Passwords don't match"
    }),
    city: Joi.string().min(5).max(25),
    salary: Joi.number()
  });

  const updateTrainerData = {
    firstName: updateData.firstName,
    lastName: updateData.lastName,
    dni: updateData.dni,
    phone: updateData.phone,
    email: updateData.email,
    password: updateData.password,
    city: updateData.city,
    salary: updateData.salary
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
      ...updateTrainerData
    }
  });

  const history = useHistory();

  const trainerBody = {
    method: updateData.mode === 'edit' ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: token
    },
    body: JSON.stringify(inputForm)
  };

  const handleUpdateButtonClick = () => {
    setModalUpdateConfirmOpen(true);
  };

  const formSubmit = async () => {
    if (id) {
      handleUpdateButtonClick();
      const updatedTrainer = await dispatch(updateTrainer(id, trainerBody));
      if (updatedTrainer.type === 'UPDATE_TRAINER') {
        setToastErrorOpen(false);
        setModalSuccess(true);
        setTimeout(() => {
          history.goBack();
        }, 1000);
      }
    } else {
      const postTrainer = await dispatch(createTrainer(trainerBody));
      if (postTrainer.type === 'ADD_TRAINER') {
        setModalSuccess(true);
        setTimeout(() => {
          history.goBack();
        }, 1000);
      }
    }
  };

  const onSubmit = async (data) => {
    setInputForm({
      firstName: data.firstName,
      lastName: data.lastName,
      dni: data.dni,
      phone: data.phone,
      email: data.email,
      password: data.password,
      city: data.city,
      salary: data.salary
    });
    setModalUpdateConfirmOpen(true);
  };

  useEffect(() => {
    if (!location.pathname === '/api/auth/') {
      setToastErrorOpen(!!isError);
    }
  }, [isError]);

  useEffect(() => {
    if (!isPending) {
      setShowLoader(true);
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPending]);

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <h3 className={styles.title}>Add Trainer</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.form}>
              <div className={styles.groupContainer}>
                <div>
                  <Inputs
                    nameTitle="First name"
                    register={register}
                    nameInput="firstName"
                    type="text"
                    error={errors.firstName?.message}
                  />
                </div>

                <div>
                  <Inputs
                    nameTitle="DNI"
                    register={register}
                    nameInput="dni"
                    type="number"
                    error={errors.dni?.message}
                  />
                </div>
                <div>
                  <Inputs
                    nameTitle="Phone"
                    register={register}
                    nameInput="phone"
                    type="number"
                    error={errors.phone?.message}
                  />
                </div>

                {!id && (
                  <div>
                    <Inputs
                      nameTitle="Password"
                      register={register}
                      nameInput="password"
                      type="password"
                      error={errors.password?.message}
                    />
                  </div>
                )}
              </div>
              <div className={styles.groupContainer}>
                <div>
                  <Inputs
                    nameTitle="Last name"
                    register={register}
                    nameInput="lastName"
                    type="text"
                    error={errors.lastName?.message}
                  />
                </div>
                <div>
                  <Inputs
                    nameTitle="City"
                    register={register}
                    nameInput="city"
                    type="text"
                    error={errors.city?.message}
                  />
                </div>

                <div>
                  <Inputs
                    nameTitle="Email"
                    register={register}
                    nameInput="email"
                    type="text"
                    error={errors.email?.message}
                  />
                </div>

                {!id && (
                  <div>
                    <Inputs
                      nameTitle="Repeat Password"
                      register={register}
                      nameInput="repeatPassword"
                      type="password"
                      error={errors.repeatPassword?.message}
                    />
                  </div>
                )}
                <div>
                  <Inputs
                    nameTitle="Salary"
                    register={register}
                    nameInput="salary"
                    type="number"
                    error={errors.salary?.message}
                  />
                </div>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <Button
                clickAction={() => {}}
                text={id ? 'Update' : 'Add'}
                testId="trainer-save-btn"
              />
              <Button clickAction={() => reset()} text="Reset" testId="trainer-reset-btn" />
              <Button
                text="Cancel"
                clickAction={() => history.goBack()}
                testId="trainer-cancel-btn"
              />
            </div>
          </form>

          {modalUpdateConfirmOpen && (
            <ModalConfirm
              method={id ? 'Edit' : 'Create'}
              message={
                id
                  ? 'Are you sure you want to update this trainer?'
                  : 'Are you sure you want to add this trainer?'
              }
              onConfirm={formSubmit}
              setModalConfirmOpen={setModalUpdateConfirmOpen}
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccess}
              message={
                id ? 'Trainer has been updated succesfully' : 'Trainer has been added succesfully'
              }
            />
          )}
          {toastErrorOpen && (
            <ToastError setToastErroOpen={setToastErrorOpen} message={isError.message} />
          )}
        </div>
      )}
    </>
  );
};

export default FormTrainer;
