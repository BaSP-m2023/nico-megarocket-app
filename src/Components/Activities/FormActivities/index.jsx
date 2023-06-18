import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import style from './modalAdd.module.css';
import { ModalConfirm, ModalSuccess, Inputs, Button, ToastError } from '../../Shared';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { addActivity, updateActivity } from '../../../redux/activities/thunks';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const ModalAddActivity = () => {
  const dispatch = useDispatch();
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [modalUpdateConfirmOpen, setModalUpdateConfirmOpen] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [inputForm, setInputForm] = useState('');
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();
  const isError = useSelector((store) => store.activities.formError);
  const updateData = location.state.params;

  const validationSchema = Joi.object({
    name: Joi.string()
      .pattern(/^[A-Za-z\s]{2,30}$/)
      .required()
      .min(2)
      .max(30)
      .messages({
        'string.base': 'Name must be a string',
        'string.min': 'Name must be at last 2 characters',
        'string.max': 'Name must contain at last 30 characters'
      }),
    description: Joi.string()
      .min(2)
      .max(50)
      .messages({
        'string.base': 'Description must be a string',
        'string.min': 'Description must be at last 3 characters',
        'string.max': 'Description invalid lenght'
      })
      .required(),
    isActive: Joi.boolean().required().default(true)
  });

  const updateActivityData = {
    name: updateData.name,
    description: updateData.description,
    isActive: updateData.isActive
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(validationSchema),
    defaultValues: {
      ...updateActivityData
    }
  });

  useEffect(() => {
    if (updateData.mode === 'edit') {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, []);

  useEffect(() => {
    setToastError(!!isError);
  }, [isError]);

  const handleUpdateButtonClick = () => {
    setModalUpdateConfirmOpen(true);
  };

  const formSubmit = async () => {
    if (id) {
      handleUpdateButtonClick();
      const putActivity = await updateActivity(dispatch, id, inputForm);
      if (putActivity.type === 'UPDATE_ACTIVITIES_SUCCESS') {
        setToastError(false);
        setModalSuccessOpen(false);
        setTimeout(() => {
          history.goBack();
        }, 1000);
      }
    } else {
      const postActivity = await addActivity(dispatch, inputForm);
      console.log(postActivity);
      if (postActivity.type === 'ADD_ACTIVITIES_SUCCESS') {
        setModalSuccessOpen(true);
        setTimeout(() => {
          history.goBack();
        }, 1000);
      }
    }
  };

  const onSubmit = async (data) => {
    setInputForm(data);
    setModalUpdateConfirmOpen(true);
    console.log(data);
  };

  return (
    <section className={style.containerModal}>
      <form className={style.containerForm} onSubmit={handleSubmit(onSubmit)}>
        <h3>Activity</h3>
        <Inputs
          nameTitle="Name:"
          register={register}
          nameInput="name"
          type="text"
          error={errors.name?.message}
        />
        <Inputs
          nameTitle="Description:"
          type="text"
          register={register}
          nameInput="description"
          error={errors.description?.message}
        />
        <div className={style.containerModal}>
          <label>Status:</label>
          <label>
            True
            <input
              {...register('isActive', {
                required: { value: true, message: 'This field is required' }
              })}
              type="radio"
              name="isActive"
              value={true}
            />
          </label>
          <label>
            False
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
        <div className={style.containerAddButton}>
          <Button clickAction={() => history.goBack()} text="Cancel" />
          <Button clickAction={() => reset()} text="Reset" />
          <Button clickAction={() => {}} text="Save" />
        </div>
      </form>
      {modalUpdateConfirmOpen && (
        <ModalConfirm
          method={editMode ? 'Edit' : 'Create'}
          onConfirm={formSubmit}
          message={
            editMode
              ? 'Are you sure you want to edit this Activity?'
              : 'Are you sure you want to add this Activity?'
          }
          setModalConfirmOpen={setModalUpdateConfirmOpen}
        />
      )}
      {modalSuccessOpen && (
        <ModalSuccess
          setModalSuccessOpen={setModalSuccessOpen}
          message="Activity added successfully"
        />
      )}
      {toastError && <ToastError setToastErroOpen={setToastError} message={isError.message} />}
    </section>
  );
};

export default ModalAddActivity;
