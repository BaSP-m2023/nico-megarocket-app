import React, { useState, useEffect } from 'react';
import formStyles from '../Form/formClasses.module.css';
import { ModalConfirm, ModalSuccess, Button, Inputs, OptionInput } from 'Components/Shared';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getClasses, createClass, updateClass } from 'redux/classes/thunks';
import { getTrainers } from 'redux/trainers/thunks';
import { getAllActivities } from 'redux/activities/thunks';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

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
  slots: Joi.number().min(1).max(20).required().messages({
    'number.base': 'Slots must be a number',
    'number.min': 'Slots must be at least 1',
    'number.max': 'Slots cannot exceed 20',
    'any.required': 'Slots is required'
  })
});

const FormClasses = () => {
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [updClass, setUpdClass] = useState({});
  const [trainerChange, setTrainerChange] = useState('');

  const { id } = useParams();
  const locationObject = useLocation();
  const updateData = locationObject.state.params;
  const classes = useSelector((state) => state.classes.list);
  const trainers = useSelector((state) => state.trainers.list);
  const activities = useSelector((state) => state.activities.list);
  const dispatch = useDispatch();
  const history = useHistory();
  const updateItem = classes.find((item) => item._id === id);

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
    setValue,
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
    setTrainerChange(classesData.trainer[0]);
  }, []);

  const classBody = {
    method: updateData.mode === 'edit' ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updClass)
  };

  const openModal = async (data) => {
    if (trainerChange === undefined) {
      const classArrayTrainer = { ...data, trainer: [data.trainer] };
      setModalConfirmOpen(true);
      setUpdClass(classArrayTrainer);
    } else {
      if (typeof data.trainer === 'object') {
        setTrainerChange(data.trainer[0]);
      } else {
        setTrainerChange(data.trainer);
      }
      const classArrayTrainer = { ...data, trainer: [trainerChange] };
      setModalConfirmOpen(true);
      setUpdClass(classArrayTrainer);
    }
  };

  const formSubmit = async () => {
    if (updateData.mode === 'edit') {
      setModalConfirmOpen(false);
      await updateClass(id, classBody, dispatch);
      await setModalSuccessOpen(true);
      setTimeout(() => {
        history.push('/admin/classes');
        setModalSuccessOpen(false);
      }, 2000);
    } else {
      await createClass(classBody, dispatch);
      await setModalSuccessOpen(true);
      setTimeout(() => {
        history.goBack();
        setModalSuccessOpen(false);
      }, 2000);
    }
  };

  return (
    <div className={formStyles.container}>
      <form className={formStyles.form} onSubmit={handleSubmit(openModal)}>
        <div className={formStyles.container}>
          <h2 className={formStyles.formTitle}>
            {updateData.mode === 'edit' ? 'Update' : 'Create'} Class
          </h2>
          <div className={formStyles.inputs}>
            <Inputs
              type={'text'}
              isDisabled={false}
              nameInput={'hour'}
              nameTitle="Hour"
              register={register}
              error={errors.hour?.message}
            />

            <Inputs
              type={'text'}
              isDisabled={false}
              nameInput={'day'}
              nameTitle="Day"
              register={register}
              error={errors.day?.message}
            />

            <OptionInput
              data={trainers}
              dataLabel="Trainers"
              setValue={setValue}
              aValue={classesData.trainer}
              name="trainer"
              register={register}
              error={errors.trainer?.message}
            />

            <OptionInput
              data={activities}
              dataLabel="Activities"
              setValue={setValue}
              aValue={classesData.activity}
              name="activity"
              register={register}
              error={errors.activity?.message}
            />

            <Inputs
              type={'text'}
              isDisabled={false}
              nameInput={'slots'}
              nameTitle="Slots"
              register={register}
              error={errors.slots?.message}
            />
          </div>
          <div className={formStyles.buttons}>
            <span className={formStyles.cancelButton}>
              <Button clickAction={() => history.push('/admin/classes')} text="Cancel" />
            </span>
            <Button clickAction={() => reset()} text="Reset" />
            <Button
              clickAction={() => {}}
              text={updateData.mode === 'edit' ? 'Update' : 'Create'}
            />
          </div>
        </div>
      </form>
      {modalConfirmOpen && (
        <ModalConfirm
          method={updateData.mode === 'edit' ? 'Edit' : 'Create'}
          onConfirm={formSubmit}
          setModalConfirmOpen={setModalConfirmOpen}
          message={
            updateData.mode === 'edit'
              ? 'Are you sure you want to update this?'
              : 'Are you sure you want to create this?'
          }
        />
      )}
      <div>
        {modalSuccessOpen && (
          <ModalSuccess
            setModalSuccessOpen={setModalSuccessOpen}
            message={
              updateData.mode === 'edit'
                ? 'The class has been updated successfully'
                : 'The class has been created successfully'
            }
          />
        )}
      </div>
    </div>
  );
};

export default FormClasses;
