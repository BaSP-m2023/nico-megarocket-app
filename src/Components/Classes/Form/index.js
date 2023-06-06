import React, { useEffect, useState } from 'react';
import formStyles from '../Form/formClasses.module.css';
import { ModalConfirm, ModalSuccess, ToastError, Button } from '../../Shared';
import { useHistory, useLocation, useParams } from 'react-router-dom';

const FormClasses = () => {
  const [modalUpdateConfirmOpen, setModalUpdateConfirmOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [toastErrorOpen, setToastErrorOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [inputForm, setInputForm] = useState('');
  const { id } = useParams();
  const locationObject = useLocation();
  const updateData = locationObject.state.params;

  useEffect(() => {
    {
      updateData.mode === 'edit'
        ? setInputForm({
            hour: updateData.item.hour,
            day: updateData.item.day,
            trainer: updateData.item.trainer.map((item) => item._id),
            activity: updateData.item.activity._id,
            slots: updateData.item.slots
          })
        : setInputForm({ hour: '', day: '', trainer: '', activity: '', slots: '' });
    }
  }, []);

  const history = useHistory();

  const classBody = {
    method: updateData.mode === 'edit' ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputForm)
  };

  const createClass = async (body) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class`, body);
      const data = await response.json();
      if (data.error === true) {
        setToastMessage(data.message);
        setToastErrorOpen(true);
      } else {
        setSuccessMessage('The class has been created successfully.');
        setModalSuccessOpen(true);
        setTimeout(() => {
          history.push('/classes');
          setModalSuccessOpen(false);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateClass = async (id, body) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`, body);
      const data = await response.json();
      if (data.error === true) {
        setToastMessage(data.message);
        setToastErrorOpen(true);
      } else {
        setSuccessMessage('The class has been updated successfully.');
        setModalSuccessOpen(true);
        setTimeout(() => {
          history.push('/classes');
          setModalSuccessOpen(false);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateButtonClick = () => {
    setModalUpdateConfirmOpen(true);
  };

  const handleModalConfirmation = () => {
    updateClass(id, classBody);
    setModalUpdateConfirmOpen(false);
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
      createClass(classBody);
    }
  };

  return (
    <div>
      <form className={formStyles.form}>
        <div className={formStyles.container}>
          <h2 className={formStyles.formTitle}>
            {updateData.mode === 'edit' ? 'Update' : 'Create'} Class
          </h2>
          <div className={formStyles.inputs}>
            <input
              placeholder="Hour"
              name="hour"
              type="text"
              value={inputForm.hour}
              onChange={onChangeHour}
            />
            <input
              placeholder="Day"
              name="day"
              type="text"
              value={inputForm.day}
              onChange={onChangeDay}
            />
            <input
              placeholder="Trainer"
              name="trainer"
              type="text"
              value={inputForm.trainer}
              onChange={onChangeTrainer}
            />
            <input
              placeholder="Activity"
              name="activity"
              type="text"
              value={inputForm.activity}
              onChange={onChangeActivity}
            />
            <input
              placeholder="Slots"
              name="slots"
              type="number"
              value={inputForm.slots}
              onChange={onChangeSlots}
            />
          </div>
          <div className={formStyles.buttons}>
            <Button
              clickAction={formSubmit}
              text={updateData.mode === 'edit' ? 'Update' : 'Create'}
            />
            <span className={formStyles.cancelButton}>
              <Button clickAction={() => history.goBack()} text="Cancel" />
            </span>
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
      {toastErrorOpen && <ToastError setToastErroOpen={setToastErrorOpen} message={toastMessage} />}
    </div>
  );
};

export default FormClasses;
