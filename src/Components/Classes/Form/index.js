import React, { useState } from 'react';
import formStyles from '../Form/form.module.css';
import { ModalConfirm } from '../../Shared/';

const Form = ({ updateClass, createCLass, show, updateToggle, classUpdateId, klass }) => {
  const [modalUpdateConfirmOpen, setModalUpdateConfirmOpen] = useState(false);

  const classBody = {
    method: updateToggle.updateMode ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(klass.klass)
  };

  const handleUpdateButtonClick = () => {
    setModalUpdateConfirmOpen(true);
  };

  const handleModalConfirmation = () => {
    updateClass(classUpdateId, classBody);
    setModalUpdateConfirmOpen(false);
    klass.setKlass({
      hour: '',
      day: '',
      trainer: '',
      activity: '',
      slots: ''
    });
    updateToggle.setUpdateMode(false);
    show();
  };

  const onChangeHour = (e) => {
    klass.setKlass({
      ...klass.klass,
      hour: e.target.value
    });
  };

  const onChangeDay = (e) => {
    klass.setKlass({
      ...klass.klass,
      day: e.target.value
    });
  };

  const onChangeTrainer = (e) => {
    klass.setKlass({
      ...klass.klass,
      trainer: [e.target.value]
    });
  };

  const onChangeActivity = (e) => {
    klass.setKlass({
      ...klass.klass,
      activity: e.target.value
    });
  };

  const onChangeSlots = (e) => {
    klass.setKlass({
      ...klass.klass,
      slots: e.target.value
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();

    if (updateToggle.updateMode) {
      handleUpdateButtonClick();
    } else {
      createCLass(classBody);
    }
  };

  return (
    <div>
      <form className={formStyles.form} onSubmit={formSubmit}>
        <div className={formStyles.container}>
          <h2 className={formStyles.formTitle}>Add Class</h2>
          <div className={formStyles.inputs}>
            <input
              placeholder="Hour"
              name="hour"
              type="text"
              value={klass.klass.hour}
              onChange={onChangeHour}
            />
            <input
              placeholder="Day"
              name="day"
              type="text"
              value={klass.klass.day}
              onChange={onChangeDay}
            />
            <input
              placeholder="Trainer"
              name="trainer"
              type="text"
              value={klass.klass.trainer}
              onChange={onChangeTrainer}
            />
            <input
              placeholder="Activity"
              name="activity"
              type="text"
              value={klass.klass.activity}
              onChange={onChangeActivity}
            />
            <input
              placeholder="Slots"
              name="slots"
              type="number"
              value={klass.klass.slots}
              onChange={onChangeSlots}
            />
          </div>
          <div className={formStyles.buttons}>
            <button type="submit">Send</button>
            <button type="button" onClick={show}>
              Cancel
            </button>
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
    </div>
  );
};

export default Form;
