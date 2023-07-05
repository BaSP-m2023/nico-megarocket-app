import React, { useState } from 'react';
import styles from './signUp.module.css';
import { Inputs, OptionInput, Button, ToastError } from 'Components/Shared';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { signUpMember } from 'redux/auth/thunks';
import ModalSuccess from 'Components/Shared/Modals/ModalSuccess/index';

const SignForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [openModalSuccess, setOpenModalSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [toastError, setToastError] = useState(null);

  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(15)
      .regex(/^[a-zA-Z ]+$/)
      .messages({
        'string.base': 'The first name must be a text string',
        'string.empty': 'The first name is a required field',
        'string.min': 'The first name must be at least 3 characters',
        'string.max': 'The first name must be at most 15 characters',
        'string.pattern.base': 'The first name must contain only letters'
      })
      .required(),

    lastName: Joi.string()
      .min(3)
      .max(15)
      .messages({
        'string.base': 'The last name must be a text string',
        'string.empty': 'The last name is a required field',
        'string.min': 'The last name must be at least 3 characters',
        'string.max': 'The last name must be at most 15 characters'
      })
      .required(),

    dni: Joi.number().min(10000000).max(99999999).integer().messages({
      'number.base': 'The DNI must be a number',
      'number.empty': 'The DNI is a required field',
      'number.min': 'The DNI must be at least 10,000,000',
      'number.max': 'The DNI must be at most 99,999,999',
      'number.integer': 'The DNI must be an integer'
    }),

    birthday: Joi.date()
      .messages({
        'date.base': 'The birthday must be a valid date',
        'date.empty': 'The birthday is a required field'
      })
      .required(),

    phone: Joi.string()
      .min(10)
      .max(10)
      .messages({
        'string.base': 'The phone number must be a text string',
        'string.empty': 'The phone number is a required field',
        'string.min': 'The phone number must be at least 10 digits'
      })
      .required(),

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .messages({
        'string.base': 'The email must be a text string',
        'string.empty': 'The email is a required field',
        'string.email': 'The email must be a valid email address',
        'string.minDomainSegments': 'The email must have at least 2 domain segments',
        'string.tlds.allow': 'The email must have a valid top-level domain (com or net)'
      }),

    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .required()
      .messages({
        'string.pattern.base':
          'The password must contain at least one lowercase letter, one uppercase letter, and one digit',
        'string.min': 'The password must be at least 8 characters long',
        'string.empty': 'The password field is required'
      }),

    repeatPassword: Joi.string().valid(Joi.ref('password')),

    city: Joi.string()
      .min(3)
      .max(15)
      .messages({
        'string.base': 'The city must be a text string',
        'string.empty': 'The city is a required field',
        'string.min': 'The city must be at least 3 characters',
        'string.max': 'The city must be at most 15 characters'
      })
      .required(),

    postalCode: Joi.string()
      .min(4)
      .max(5)
      .messages({
        'string.base': 'The postal code must be a text string',
        'string.empty': 'The postal code is a required field',
        'string.min': 'The postal code must be at least 4 digits',
        'string.max': 'The postal code must be at most 5 digits'
      })
      .required(),

    membership: Joi.string()
      .messages({
        'alternatives.types': 'Membership most be required'
      })
      .required()
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });

  const onSubmit = async (data) => {
    const memberEdit = {
      firstName: data.firstName,
      lastName: data.lastName,
      dni: data.dni,
      phone: data.phone,
      email: data.email,
      city: data.city,
      password: data.password,
      postalCode: data.postalCode,
      membership: data.membership,
      birthday: data.birthday
    };
    if (Object.values(errors).length === 0) {
      try {
        const responseSignUp = await dispatch(signUpMember(memberEdit));
        if (responseSignUp.type === 'SIGN_UP_SUCCESS') {
          setOpenModalSuccess(true);
          setTimeout(() => {
            setOpenModalSuccess(false);
            history.push('/auth/login');
          }, 2000);
        }
        if (responseSignUp.type === 'SIGN_UP_ERROR') {
          setToastError(true);
        }
      } catch (error) {
        setToastError(true);
      }
    }
  };

  const memberships = ['Classic', 'Black', 'Only Classes'];

  return (
    <div>
      {openModalSuccess && (
        <ModalSuccess
          setModalSuccessOpen={setOpenModalSuccess}
          message={'Sign In Successfully!'}
          testId="member-modal-success"
        />
      )}

      {toastError && (
        <ToastError
          setToastErroOpen={setToastError}
          message={'Email is already in use'}
          testId="member-form-toast-error"
        />
      )}

      {error && (
        <div className={styles.boxError} data-testid="signUp-error-pop">
          <div className={styles.lineError}>
            <div className={styles.errorLogo}>!</div>
            Sign In error
            <div
              onClick={() => {
                setError(false);
              }}
              className={styles.close_icon}
            ></div>
          </div>
          <p className={styles.MsgError}>Email is already user</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <h1 className={styles.title}>Sign Up</h1>
        <div className={styles.form}>
          <div className={styles.groupContainer}>
            <div className={styles.inputContainer}>
              <Inputs
                nameInput="firstName"
                nameTitle="Name"
                register={register}
                type="text"
                error={errors.firstName?.message}
                testId="signup-name-input"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="Last Name"
                nameInput="lastName"
                register={register}
                type="text"
                error={errors.lastName?.message}
                testId="signup-lastname-input"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="DNI"
                nameInput="dni"
                register={register}
                type="text"
                error={errors.dni?.message}
                testId="signup-dni-input"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameInput="birthday"
                nameTitle="Birthday"
                register={register}
                type="date"
                error={errors.birthday?.message}
                testId="signup-birthday-input"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameInput="phone"
                nameTitle="Phone"
                register={register}
                type="number"
                error={errors.phone?.message}
                testId="signup-phone-input"
              />
            </div>
          </div>
          <div className={styles.groupContainer}>
            <div className={styles.inputContainer}>
              <Inputs
                nameInput="city"
                nameTitle="City"
                register={register}
                type="text"
                error={errors.city?.message}
                testId="signup-city-input"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameInput="postalCode"
                nameTitle="Postal Code"
                register={register}
                type="number"
                error={errors.postalCode?.message}
                testId="signup-postalcode-input"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="Email"
                nameInput="email"
                register={register}
                type="email"
                error={errors.email?.message}
                testId="signup-email-input"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="Password"
                nameInput="password"
                register={register}
                type="password"
                error={errors.password?.message}
                testId="signup-password-input"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="Repeat Password"
                nameInput="repeatPassword"
                register={register}
                type="password"
                error={errors.repeatPassword?.message}
                testId="signup-repeatpassword-input"
              />
            </div>
            <div className={styles.inputContainer}>
              <OptionInput
                data={memberships}
                name="membership"
                dataLabel="Membership"
                register={register}
                error={errors.membership?.message}
                testId="signup-membership-input"
              />
            </div>
          </div>
        </div>
        <div className={styles.buttonsGroup}>
          <Button clickAction={() => {}} text="Sign In" testId="signup-btn" />
          <Button text="Cancel" clickAction={() => history.goBack()} testId="signup-cancel-btn" />
        </div>
      </form>
    </div>
  );
};

export default SignForm;
