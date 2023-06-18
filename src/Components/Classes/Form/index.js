import React, { useState, useEffect } from 'react';
import formStyles from '../Form/formClasses.module.css';
import { ModalConfirm, ModalSuccess, Button, Inputs, OptionInput } from '../../Shared';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getClasses, createClass, updateClass } from '../../../redux/classes/thunks';
import { getTrainers } from '../../../redux/trainers/thunks';
import { getAllActivities } from './../../../redux/activities/thunks';
import { useForm } from 'react-hook-form';

const FormClasses = () => {
  const [modalUpdateConfirmOpen, setModalUpdateConfirmOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [inputForm, setInputForm] = useState('');
  const { id } = useParams();
  const locationObject = useLocation();
  const updateData = locationObject.state.params;
  const classes = useSelector((state) => state.classes.list);
  const trainers = useSelector((state) => state.trainers.list);
  const activities = useSelector((state) => state.activities.list);
  const dispatch = useDispatch();
  const history = useHistory();

  const updateItem = classes.find((item) => item._id === id);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    getClasses(dispatch);
    getTrainers(dispatch);
    getAllActivities(dispatch);
  }, []);

  useEffect(() => {
    {
      updateData.mode === 'edit'
        ? setInputForm({
            hour: updateItem?.hour,
            day: updateItem?.day,
            trainer: updateItem?.trainer ? updateItem.trainer.map((item) => item._id) : '',
            activity: updateItem?.activity ? updateItem.activity._id : '',
            slots: updateItem?.slots
          })
        : setInputForm({ hour: '', day: '', trainer: '', activity: '', slots: '' });
    }
  }, [classes && classes.length === 0]);

  const classBody = {
    method: updateData.mode === 'edit' ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputForm)
  };

  const handleUpdateButtonClick = () => {
    setModalUpdateConfirmOpen(true);
  };

  const handleModalConfirmation = () => {
    updateClass(id, classBody, dispatch);
    setModalUpdateConfirmOpen(false);
    setSuccessMessage('The class has been updated successfully.');
    setModalSuccessOpen(true);
    setTimeout(() => {
      history.push('/admin/classes');
      setModalSuccessOpen(false);
    }, 2000);
  };

  const onChangeHour = (e) => {
    setInputForm({
      ...inputForm,
      hour: e.target.value
    });
  };

  const onChangeDay = (e) => {
    setInputForm({
      ...inputForm,
      day: e.target.value
    });
  };

  const onChangeTrainer = (e) => {
    setInputForm({
      ...inputForm,
      trainer: [e.target.value]
    });
  };

  const onChangeActivity = (e) => {
    setInputForm({
      ...inputForm,
      activity: e.target.value
    });
  };

  const onChangeSlots = (e) => {
    setInputForm({
      ...inputForm,
      slots: e.target.value
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();

    if (updateData.mode === 'edit') {
      handleUpdateButtonClick();
    } else {
      createClass(classBody, dispatch);
      setSuccessMessage('The class has been created successfully.');
      setModalSuccessOpen(true);
      setTimeout(() => {
        history.push('/classes');
        setModalSuccessOpen(false);
      }, 2000);
    }
  };

  return (
    <div className={formStyles.container}>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <div className={formStyles.container}>
          <h2 className={formStyles.formTitle}>
            {updateData.mode === 'edit' ? 'Update' : 'Create'} Class
          </h2>
          <div className={formStyles.inputs}>
            <Inputs
              type={'text'}
              isDisabled={false}
              change={onChangeHour}
              nameInput={'hour'}
              nameTitle="Hour"
              register={register}
            />

            <Inputs
              type={'text'}
              isDisabled={false}
              change={onChangeDay}
              nameInput={'day'}
              nameTitle="Day"
              register={register}
            />

            <OptionInput
              data={trainers}
              dataLabel="Trainers"
              onChangeOption={onChangeTrainer}
              setValue={inputForm.trainer}
              name="trainer"
            />

            <OptionInput
              data={activities}
              dataLabel="Activities"
              onChangeOption={onChangeActivity}
              setValue={inputForm.activity}
              name="activity"
            />

            <Inputs
              type={'text'}
              isDisabled={false}
              change={onChangeSlots}
              nameInput={'slots'}
              nameTitle="Slots"
              register={register}
            />
          </div>
          <div className={formStyles.buttons}>
            <span className={formStyles.cancelButton}>
              <Button clickAction={() => history.goBack()} text="Cancel" />
            </span>
            <Button
              clickAction={formSubmit}
              text={updateData.mode === 'edit' ? 'Update' : 'Create'}
            />
          </div>
        </div>
      </form>
      {modalUpdateConfirmOpen && (
        <ModalConfirm
          method="Update"
          onConfirm={handleModalConfirmation}
          setModalConfirmOpen={setModalUpdateConfirmOpen}
          message="Are you sure you want to update this?"
        />
      )}
      <div>
        {modalSuccessOpen && (
          <ModalSuccess setModalSuccessOpen={setModalSuccessOpen} message={successMessage} />
        )}
      </div>
    </div>
  );
};

export default FormClasses;
