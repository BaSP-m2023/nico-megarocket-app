import React, { useState, useEffect } from 'react';
import styles from './recoverPassword.module.css';
import { Inputs, Button, ModalSuccess, ModalError } from 'Components/Shared';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { recoverPassword } from 'redux/auth/thunks';
import { getAllAdmins } from 'redux/admins/thunks';
import { getAllMembers } from 'redux/members/thunks';
import { getTrainers } from 'redux/trainers/thunks';
import { login } from 'redux/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const schema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({
      'string.base': 'The email must be a text string',
      'string.empty': 'The email is a required field',
      'string.email': 'The email must be a valid email address',
      'string.minDomainSegments': 'The email must have at least 2 domain segments',
      'string.tlds.allow': 'The email must have a valid top-level domain (.com or .net)'
    })
});

const RecoverPassword = () => {
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [message, setMessage] = useState('');
  const [headerMessage, setHeaderMessage] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const admins = useSelector((state) => state.admins.list);
  const trainers = useSelector((state) => state.admins.list);
  const members = useSelector((state) => state.admins.list);
  const data = {
    email: 'admin@admin.com',
    password: 'Eladmin1'
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });
  const logForData = async () => {
    await dispatch(login(data));
  };

  const emailExistsInDB = (data) => {
    if (admins?.some((admin) => admin.email === data.email)) {
      return true;
    }
    if (trainers?.some((trainer) => trainer.email === data.email)) {
      return true;
    }
    if (members?.some((member) => member.email === data.email)) {
      return true;
    }
  };

  const onSubmit = async (data) => {
    if (emailExistsInDB(data)) {
      await dispatch(recoverPassword(data));
      setModalSuccess(true);
      setTimeout(() => {
        setModalSuccess(false);
        history.push('/auth/login');
      }, 2000);
    } else {
      setHeaderMessage('Oops!');
      setMessage('No account registered with this email');
      setModalError(true);
    }
  };

  useEffect(() => {
    logForData();
    dispatch(getAllAdmins);
    dispatch(getAllMembers);
    dispatch(getTrainers);
  }, []);

  return (
    <form className={styles.formRecoverPassword} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.wholeRecoverContainer}>
        <h1 className={styles.titleRecover}>Recover Password</h1>
        <div className={styles.boxInfo}>
          <p className={styles.textInfo}>We will send you a recovery code to your inbox</p>
        </div>
        <div className={styles.containerRecoverForm}>
          <Inputs
            type="email"
            nameInput={'email'}
            nameTitle={'Email'}
            register={register}
            error={errors.email?.message}
          />
        </div>
        <div className={styles.sub_buttons}>
          <Button className={styles.buttonLogin} clickAction={() => {}} text="Confirm" />
          <Button text="Cancel" clickAction={() => history.goBack()} />
        </div>
      </div>

      {modalSuccess && (
        <ModalSuccess
          setModalSuccessOpen={setModalSuccess}
          message={'We send you a verification code to your email!'}
        />
      )}
      {modalError && (
        <ModalError
          setModalErrorOpen={setModalError}
          message={message}
          headerMessage={headerMessage}
        />
      )}
    </form>
  );
};
export default RecoverPassword;
