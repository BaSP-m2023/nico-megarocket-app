/* eslint-disable prettier/prettier */
import React from 'react';
import formStyles from '../Form/form.module.css';

const Form = ({ updateClass, createCLass, show, updateToggle, classUpdateId, klass }) => {

  const classBody = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(klass.klass)
  };

  const updateClassBody = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(klass.klass)
  };

  const onChangeHour = (e) => {
    klass.setKlass({
      ...klass.klass,
      // eslint-disable-next-line prettier/prettier
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
      // eslint-disable-next-line prettier/prettier
      trainer: [ e.target.value ]
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
      updateClass(classUpdateId, updateClassBody);
    } else {
      createCLass(classBody);
    }

    klass.setKlass({
      hour: '',
      day: '',
      trainer: '',
      activity: '',
      slots: ''
    });
    updateToggle.setUpdateMode(false);
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
              value={klass.hour}
              onChange={onChangeHour}
            />
            <input
              placeholder="Day"
              name="day"
              type="text"
              value={klass.day}
              onChange={onChangeDay}
            />
            <input
              placeholder="Trainer"
              name="trainer"
              type="text"
              value={klass.trainer}
              onChange={onChangeTrainer}
            />
            <input
              placeholder="Activity"
              name="activity"
              type="text"
              value={klass.activity}
              onChange={onChangeActivity}
            />
            <input
              placeholder="Slots"
              name="slots"
              type="number"
              value={klass.slots}
              onChange={onChangeSlots}
            />
          </div>
          <div className={formStyles.buttons}>
            <button type="submit" onClick={show}>
              Send
            </button>
            <button type="button" onClick={show}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>

  );
};

export default Form;
