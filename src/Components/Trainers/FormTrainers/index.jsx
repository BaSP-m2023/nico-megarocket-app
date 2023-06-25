import React, { useState } from 'react';
import styles from './form.module.css';
import { ModalConfirm, ModalSuccess, ToastError, Inputs, Button } from 'Components/Shared';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { createTrainer, updateTrainer } from '../../../redux/trainers/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const FormTrainer = () => {
  const [modalUpdateConfirmOpen, setModalUpdateConfirmOpen] = useState(false);
  const [toastErrorOpen, setToastErrorOpen] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [inputForm, setInputForm] = useState('');
  const { id } = useParams();
  const location = useLocation();
  const updateData = location.state.params;
  const dispatch = useDispatch();
  const isError = useSelector((store) => store.trainers.formError);

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
    city: Joi.string().min(5).max(25),
    salary: Joi.number(),
    isActive: Joi.boolean().required()
  });

  const updateTrainerData = {
    firstName: updateData.firstName,
    lastName: updateData.lastName,
    dni: updateData.dni,
    phone: updateData.phone,
    email: updateData.email,
    password: updateData.password,
    city: updateData.city,
    salary: updateData.salary,
    isActive: updateData.isActive
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
      'Content-Type': 'application/json'
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
    setInputForm(data);
    setModalUpdateConfirmOpen(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form}>
          <div className={styles.groupContainer}>
            <div>
              <Inputs
                nameTitle="First Name"
                register={register}
                nameInput="firstName"
                type="text"
                error={errors.firstName?.message}
              />
            </div>
            <div>
              <Inputs
                nameTitle="Last Name"
                register={register}
                nameInput="lastName"
                type="text"
                error={errors.lastName?.message}
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
          </div>
          <div className={styles.groupContainer}>
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
                nameTitle="Salary"
                register={register}
                nameInput="salary"
                type="number"
                error={errors.salary?.message}
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

            <div>
              <Inputs
                nameTitle="Password"
                register={register}
                nameInput="password"
                type="password"
                error={errors.password?.message}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Status</label>
              <label>
                Active
                <input
                  {...register('isActive', {
                    required: { value: true, message: 'This field is required' }
                  })}
                  type="radio"
                  name="isActive"
                  value={true}
                />
              </label>
              <div>
                <label>
                  Inactive
                  <input
                    {...register('isActive', {
                      required: { value: true, message: 'This field is required' }
                    })}
                    type="radio"
                    name="isActive"
                    value={false}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttonsGroup}>
          <Button text="Save" clickAction={() => {}} />
          <Button text="Reset" clickAction={() => reset()} />
          <Button clickAction={() => history.goBack()} text="Cancel" />
        </div>
      </form>

      {modalUpdateConfirmOpen && (
        <ModalConfirm
          method={id ? 'Edit' : 'Create'}
          message={
            id
              ? 'Are you sure you want to edit the Trainer?'
              : 'Are you sure you want to add the Trainer?'
          }
          onConfirm={formSubmit}
          setModalConfirmOpen={setModalUpdateConfirmOpen}
        />
      )}
      {modalSuccess && (
        <ModalSuccess setModalSuccessOpen={setModalSuccess} message="Trainer added successfully" />
      )}
      {toastErrorOpen && (
        <ToastError setToastErroOpen={setToastErrorOpen} message={isError.message} />
      )}
    </div>
  );
};

export default FormTrainer;
