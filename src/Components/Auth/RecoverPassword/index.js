import React, { useState } from 'react';
import styles from './recoverPassword.module.css';
import { Inputs, Button } from 'Components/Shared';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import ModalSuccess from 'Components/Shared/Modals/ModalSuccess';

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

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });

  const onSubmit = () => {
    setModalSucces(true);
    setTimeout(() => {
      setModalSucces(false);
    }, 1000);
  };

  return (
    <form className={styles.formSuperAdmin} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.wholeContainer}>
        <h1 className={styles.titleLogin}>Recover Password</h1>
        <div className={styles.containerForm}>
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
