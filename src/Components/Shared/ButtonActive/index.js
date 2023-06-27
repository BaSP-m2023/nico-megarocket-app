import React, { useState } from 'react';
import styles from './buttonActive.module.css';
import { updateTrainer } from 'redux/trainers/thunks';
import { useDispatch } from 'react-redux';

const ButtonActive = ({ data }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [body, setBody] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
    dni: data.dni,
    phone: data.phone,
    email: data.email,
    city: data.city,
    salary: data.salary,
    isActive: data.isActive
  });
  const dispatch = useDispatch();

  const handlerChange = (e) => {
    e.preventDefault();
    setBody({
      ...(data.membership
        ? {
            firstName: data.firstName,
            lastName: data.lastName,
            dni: data.dni,
            birthday: data.birthday,
            phone: data.phone,
            city: data.city,
            isActive: data.isActive,
            postalCode: data.postalCode,
            email: data.email,
            membership: data.membership
          }
        : {
            firstName: data.firstName,
            lastName: data.lastName,
            dni: data.dni,
            phone: data.phone,
            email: data.email,
            city: data.city,
            salary: data.salary,
            isActive: isChecked
          })
    });
  };

  const handleToggle = async () => {
    setIsChecked(!isChecked);
    await dispatch(updateTrainer(data._id, body));
  };

  return (
    <div className={styles.container}>
      <div className={data.isActive ? styles.toggleSwitched : styles.toggleSwitch}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={isChecked}
          onClick={handleToggle}
          onChange={handlerChange}
        />
        <label className={styles.label}>
          <div className={data.isActive ? styles.switch : styles.inner}>.</div>
        </label>
      </div>
    </div>
  );
};

export default ButtonActive;
