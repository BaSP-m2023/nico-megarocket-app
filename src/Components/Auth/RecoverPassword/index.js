import React, { useState } from 'react';
import styles from './recoverPassword.module.css';
import { Inputs, Button } from 'Components/Shared';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import ModalSuccess from 'Components/Shared/Modals/ModalSuccess';
import { recoverPassword } from 'redux/auth/thunks';
import { useDispatch } from 'react-redux';
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
  const [modalSucces, setModalSucces] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });

  const onSubmit = async (data) => {
    await dispatch(recoverPassword(data));
    setModalSucces(true);
    setTimeout(() => {
      setModalSucces(false);
      history.push('/auth/login');
    }, 2000);
  };

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

      {modalSucces && (
        <ModalSuccess
          setModalSuccessOpen={setModalSucces}
          message={'We send you a verification code to your email!'}
        />
      )}
    </form>
  );
};
export default RecoverPassword;
