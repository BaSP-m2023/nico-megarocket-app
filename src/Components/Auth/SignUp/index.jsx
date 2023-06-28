import React from 'react';
import styles from './signUp.module.css';
import { Inputs, OptionInput, Button } from 'Components/Shared';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { signUpMember } from 'redux/auth/thunks';

const SignForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

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
      .required(),

    isActive: Joi.boolean()
      .messages({
        'boolean.base': 'The isActive field must be a boolean',
        'boolean.empty': 'The isActive field is a required field'
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
    if (Object.values(errors).length === 0) {
      const responseSignUp = await dispatch(signUpMember(data));
      if (responseSignUp.type === 'SIGN_UP_SUCCESS') {
        history.push('/auth/login');
      }
    }
  };

  const memberships = ['Classic', 'Black', 'Only classes'];

  return (
    <div>
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
                nameTitle="Lastname"
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
              <OptionInput
                data={memberships}
                name="membership"
                dataLabel="Membership"
                register={register}
                error={errors.membership?.message}
                testId="signup-membership-input"
              />
            </div>

            <div className={styles.radioMainContainer} data-testid="active-selector">
              <label className={styles.nameLabel}>Status</label>
              <div className={styles.radioContainer}>
                <div>
                  <label>
                    Active
                    <input
                      {...register('isActive', {
                        required: { value: true, message: 'This field is required' }
                      })}
                      type="radio"
                      name="isActive"
                      value={true}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Inactive
                    <input
                      {...register('isActive', {
                        required: { value: true, message: 'This field is required' }
                      })}
                      type="radio"
                      name="isActive"
                      value={false}
                    />
                  </label>
                </div>
              </div>
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
