import React, { useState } from 'react';
import styles from './profile-form.module.css';
import { Inputs, Button, ModalConfirm, ModalSuccess, ToastError } from 'Components/Shared';
import { updateTrainer } from 'redux/trainers/thunks';
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

const TrainerProfileForm = () => {
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [toastErroOpen, setToastErroOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('Error in database');

  const [trainerToEdit, setTrainerToEdit] = useState({});

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const trainerData = location.state.params;

  const editTrainer = {
    firstName: trainerData.firstName,
    lastName: trainerData.lastName,
    dni: trainerData.dni,
    email: trainerData.email,
    phone: trainerData.phone,
    city: trainerData.city
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
      ...editTrainer
    }
  });

  const openModal = () => {
    setModalConfirmOpen(true);
  };

  const onSubmit = async (dataTrainer) => {
    const trainerEdit = {
      firstName: dataTrainer.firstName,
      lastName: dataTrainer.lastName,
      dni: dataTrainer.dni,
      phone: dataTrainer.phone,
      email: dataTrainer.email,
      city: dataTrainer.city,
      password: dataTrainer.password
    };
    setTrainerToEdit(trainerEdit);
    openModal();
  };

  const submitTrainer = () => {
    setModalConfirmOpen(false);
    if (Object.keys(errors).length === 0) {
      editTrainers();
    } else {
      setToastMessage('Form validation error');
      setToastErroOpen(true);
    }
  };
  const token = sessionStorage.getItem('token');

  const trainerBody = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token: token
    },
    body: JSON.stringify(trainerToEdit)
  };

  const editTrainers = async () => {
    try {
      dispatch(updateTrainer(id, trainerBody));
      if (!trainerData.error) {
        confirmation();
      } else {
        throw new Error(trainerData.message);
      }
    } catch (error) {
      setToastMessage(error.message);
      setToastErroOpen(true);
    }
  };

  const confirmation = () => {
    setModalSuccessOpen(true);
    setTimeout(() => {
      history.push('/trainer/profile');
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
            />
          </div>
          <div className={styles.inputForm}>
            <Inputs
              type="text"
              nameInput={'lastName'}
              nameTitle={'Last Name'}
              register={register}
              error={errors.lastName?.message}
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
            />
          </div>
          <div className={styles.inputForm}>
            <Inputs
              type="text"
              nameInput={'phone'}
              nameTitle={'Phone'}
              register={register}
              error={errors.phone?.message}
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
            />
          </div>
          <div className={styles.inputForm}>
            <Inputs
              type="email"
              nameInput={'email'}
              nameTitle={'E-Mail'}
              register={register}
              error={errors.email?.message}
              isDisabled={true}
            />
          </div>
        </div>
        <div className={styles.buttonsBox}>
          <Button clickAction={() => {}} text="Save" />
          <Button text="Reset" clickAction={() => reset()} />
          <Button
            clickAction={(e) => {
              e.preventDefault();
              history.goBack();
            }}
            text="Cancel"
          />
        </div>
      </form>
      {modalConfirmOpen && (
        <ModalConfirm
          method={'Edit'}
          message={'Are you sure you want to edit the trainer?'}
          onConfirm={submitTrainer}
          setModalConfirmOpen={setModalConfirmOpen}
        />
      )}
      {modalSuccessOpen && (
        <ModalSuccess
          message={'Trainer edited successfully'}
          setModalSuccessOpen={setModalSuccessOpen}
        />
      )}
      {toastErroOpen && <ToastError setToastErroOpen={setToastErroOpen} message={toastMessage} />}
    </div>
  );
};

export default TrainerProfileForm;
