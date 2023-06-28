import React, { useEffect, useState } from 'react';
import styles from './buttonActive.module.css';
import { updateTrainer } from 'redux/trainers/thunks';
import { editMember } from 'redux/members/thunks';
import { useDispatch } from 'react-redux';

const ButtonActive = ({ data }) => {
  const token = sessionStorage.getItem('token');
  const [isChecked, setIsChecked] = useState(data.isActive);

  const [body, setBody] = useState(
    !data.membership
      ? {
          firstName: data.firstName,
          lastName: data.lastName,
          dni: data.dni,
          phone: data.phone,
          email: data.email,
          city: data.city,
          salary: data.salary,
          isActive: data.isActive
        }
      : {
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
  );

  const dispatch = useDispatch();

  const handlerChange = (e) => {
    setBody({
      ...body,
      isActive: e.target.checked
    });
  };

  const updateBody = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token: token
    },
    body: JSON.stringify(body)
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setTimeout(() => {
      send();
    }, 1000);
  }, [isChecked]);

  const send = async () => {
    const id = data._id;
    !data.membership
      ? await dispatch(updateTrainer(id, updateBody))
      : await dispatch(editMember(id, updateBody));
  };

  return (
    <div className={styles.container}>
      <div className={isChecked ? styles.toggleSwitched : styles.toggleSwitch}>
        <input
          type="checkbox"
          className={styles.checkbox}
          onClick={handleToggle}
          onChange={handlerChange}
          checked={isChecked}
        />
        <label className={styles.label}>
          <div className={isChecked ? styles.switch : styles.inner}>.</div>
        </label>
      </div>
    </div>
  );
};

export default ButtonActive;
