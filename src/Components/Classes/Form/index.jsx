import React, { useState } from 'react';
import formStyles from '../Form/form.module.css';

const Form = ({ addItem, show }) => {
  // eslint-disable-next-line prettier/prettier
  const [ klass, setKlass ] = useState({
    hour: '',
    day: '',
    trainer: '',
    activity: '',
    slots: ''
  });

  const classBody = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(klass)
  };

  const createClass = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/class`, classBody);
    const data = await response.json();
    console.log(data);
  };

  const onChangeHour = (e) => {
    setKlass({
      ...klass,
      hour: e.target.value
    });
  };

  const onChangeDay = (e) => {
    setKlass({
      ...klass,
      day: e.target.value
    });
  };

  const onChangeTrainer = (e) => {
    setKlass({
      ...klass,
      // eslint-disable-next-line prettier/prettier
      trainer: [ e.target.value ]
    });
  };

  const onChangeActivity = (e) => {
    setKlass({
      ...klass,
      activity: e.target.value
    });
  };

  const onChangeSlots = (e) => {
    setKlass({
      ...klass,
      slots: e.target.value
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();

    addItem();

    createClass();

    setKlass({
      hour: '',
      day: '',
      trainer: '',
      activity: '',
      slots: ''
    });
  };

  return (
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
  );
};

export default Form;
