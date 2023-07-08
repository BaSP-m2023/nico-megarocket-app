import React, { useState, useEffect } from 'react';
import formStyles from '../Form/formClasses.module.css';
import {
  ModalConfirm,
  ModalSuccess,
  Button,
  Inputs,
  OptionInput,
  Loader,
  ToastError
} from 'Components/Shared';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getClasses, createClass, updateClass } from 'redux/classes/thunks';
import { getTrainers } from 'redux/trainers/thunks';
import { getAllActivities } from 'redux/activities/thunks';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const FormClasses = () => {
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [updClass, setUpdClass] = useState({});

  const { id } = useParams();
  const locationObject = useLocation();
  const updateData = locationObject.state.params;
  const classes = useSelector((state) => state.classes.list);
  const trainers = useSelector((state) => state.trainers.list);
  const activities = useSelector((state) => state.activities.list);
  const dispatch = useDispatch();
  const history = useHistory();
  const updateItem = classes.find((item) => item._id === id);
  const isLoading = useSelector((state) => state.classes.pending);

  const daysArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const schema = Joi.object({
    hour: Joi.string()
      .pattern(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/)
      .required()
      .messages({
        'string.pattern.base': 'Hour format is HH:mm'
      }),
    day: Joi.string()
      .valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
      .messages({
        'any.only':
          'The days can only be Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday'
      })
      .required(),
    trainer: Joi.alternatives()
      .try(
        Joi.array().items(Joi.string().hex().length(24).required()),
        Joi.string().hex().length(24).required()
      )
      .messages({
        'alternatives.types': 'Trainer must be an array or a hexadecimal ID',
        'string.hex': 'Trainer must be a hexadecimal ID',
        'string.length': 'Trainer must have exactly 24 characters'
      }),
    activity: Joi.string().hex().length(24).required().messages({
      'string.hex': 'Activity has to be a hexadecimal ID',
      'string.length': 'Activity must have exactly 24 characters',
      'string.base': 'Activity must be chosen',
      'any.required': 'Activity is required'
    }),
    slots: Joi.number().min(0).max(20).required().messages({
      'number.base': 'Slots must be a number',
      'number.min': 'Slots must be at least 1',
      'number.max': 'Slots cannot exceed 20',
      'any.required': 'Slots is required'
    })
  });

  const classesData = {
    activity: updateItem?.activity ? updateItem.activity._id : '',
    day: updateItem?.day,
    hour: updateItem?.hour,
    slots: updateItem?.slots,
    trainer: updateItem?.trainer ? updateItem.trainer.map((item) => item._id) : []
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
      ...classesData
    }
  });

  useEffect(() => {
    getClasses(dispatch);
    getTrainers(dispatch);
    getAllActivities(dispatch);
  }, []);

  const classBody = {
    method: updateData.mode === 'edit' ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updClass)
  };

  const isClassTimeTaken = (hour, day, activity) => {
    return classes.some(
      (item) => item.hour === hour && item.day === day && item.activity._id === activity
    );
  };

  const openModal = async (data) => {
    const { hour, day, activity } = data;
    if (id) {
      let trainerArray = data.trainer;
      if (typeof data.trainer !== 'object') {
        trainerArray = [data.trainer];
      }
      setModalConfirmOpen(true);
      setUpdClass({ ...data, trainer: trainerArray });
    } else {
      if (isClassTimeTaken(hour, day, activity)) {
        setToastError(true);
        return;
      }
      let trainerArray = data.trainer;
      if (typeof data.trainer !== 'object') {
        trainerArray = [data.trainer];
      }
      setModalConfirmOpen(true);
      setUpdClass({ ...data, trainer: trainerArray });
    }
  };

  const formSubmit = async () => {
    if (updateData.mode === 'edit') {
      setModalConfirmOpen(false);
      await dispatch(updateClass(id, classBody));
      await setModalSuccessOpen(true);
      setTimeout(() => {
        history.goBack();
        setModalSuccessOpen(false);
      }, 2000);
    } else {
      await dispatch(createClass(classBody));
      await setModalSuccessOpen(true);
      setTimeout(() => {
        history.goBack();
        setModalSuccessOpen(false);
      }, 2000);
    }
  };

  const Hours = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00'
  ];
  return (
    <div className={formStyles.container}>
      {isLoading ? (
        <Loader testId="classes-form-loader" />
      ) : (
        <form className={formStyles.form} onSubmit={handleSubmit(openModal)}>
          <div className={formStyles.container}>
            <h3 className={formStyles.formTitle}>
              {updateData.mode === 'edit' ? 'Update' : 'Add'} Class
            </h3>
            <div className={formStyles.inputs}>
              <div className={formStyles.group}>
                <OptionInput
                  data={Hours}
                  dataLabel="Hour"
                  name="hour"
                  register={register}
                  error={errors.hour?.message}
                  testId="classes-hour-input"
                />

                <OptionInput
                  data={daysArray}
                  dataLabel="Day"
                  name="day"
                  register={register}
                  error={errors.day?.message}
                  testId="classes-day-input"
                />

                <OptionInput
                  data={trainers}
                  dataLabel="Trainers"
                  name="trainer"
                  register={register}
                  error={errors.trainer?.message}
                  testId="classes-trainer-input"
                />
              </div>
              <div className={formStyles.group}>
                <OptionInput
                  data={activities}
                  dataLabel="Activities"
                  name="activity"
                  register={register}
                  error={errors.activity?.message}
                  testId="classes-activity-input"
                />

                <Inputs
                  type={'text'}
                  isDisabled={false}
                  nameInput={'slots'}
                  nameTitle="Slots"
                  register={register}
                  error={errors.slots?.message}
                  testId="classes-slots-input"
                />
              </div>
            </div>

            <div className={formStyles.buttonContainer}>
              <Button
                clickAction={() => {}}
                text={id ? 'Update' : 'Add'}
                testId="classes-save-btn"
              />
              <Button clickAction={() => reset()} text="Reset" testId="classes-reset-btn" />
              <Button
                text="Cancel"
                clickAction={() => history.goBack()}
                testId="classes-cancel-btn"
              />
            </div>
          </div>
        </form>
      )}

      {modalConfirmOpen && (
        <ModalConfirm
          method={id ? 'Edit' : 'Create'}
          onConfirm={formSubmit}
          setModalConfirmOpen={setModalConfirmOpen}
          message={
            id ? 'Are you sure you want to update this?' : 'Are you sure you want to create this?'
          }
          testId="classes-modal-confirm"
        />
      )}
      <div>
        {modalSuccessOpen && (
          <ModalSuccess
            setModalSuccessOpen={setModalSuccessOpen}
            message={
              id
                ? 'The class has been updated successfully'
                : 'The class has been created successfully'
            }
            testId="classes-modal-success"
          />
        )}
      </div>
      {toastError && (
        <ToastError
          setToastErroOpen={setToastError}
          message="The class already exists at that time and day"
        />
      )}
    </div>
  );
};

export default FormClasses;
