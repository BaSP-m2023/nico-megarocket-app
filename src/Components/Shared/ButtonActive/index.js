import React, { useEffect, useState } from 'react';
import styles from './buttonActive.module.css';
import { updateIsActiveTrainer } from 'redux/trainers/thunks';
import { editIsActiveMember } from 'redux/members/thunks';
import { useDispatch } from 'react-redux';

const ButtonActive = ({ data, handlefocus }) => {
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

  const send = async () => {
    const id = data._id;
    !data.membership
      ? await dispatch(updateIsActiveTrainer(id, updateBody))
      : await dispatch(editIsActiveMember(id, updateBody));
  };
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

  useEffect(() => {
    if (data.isActive !== isChecked) {
      send();
    }
  }, [body, isChecked]);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={isChecked ? styles.toggleSwitched : styles.toggleSwitch}>
        <input
          type="checkbox"
          className={styles.checkbox}
          onChange={handlerChange}
          onClick={() => {
            {
              screenWidth < 967 && handlefocus();
            }
            setIsChecked(!isChecked);
          }}
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
