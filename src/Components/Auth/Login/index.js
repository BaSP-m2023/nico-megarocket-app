import React, { useState } from 'react';
import styles from './login.module.css';
import { useHistory } from 'react-router-dom';
import { Inputs, Button } from 'Components/Shared';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { login } from 'redux/auth/thunks';

const schema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({
      'string.base': 'The email must be a text string',
      'string.empty': 'The email is a required field',
      'string.email': 'The email must be a valid email address',
      'string.minDomainSegments': 'The email must have at least 2 domain segments',
      'string.tlds.allow': 'The email must have a valid top-level domain (.com or .net)'
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
    })
});

function LoginForm() {
  const [errorPop, setErrorPop] = useState(false);
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
    if (Object.values(errors).length === 0) {
      const responseLogin = await dispatch(login(data));
      const role = responseLogin.payload.role;
      switch (role) {
        case 'SUPER_ADMIN':
          history.push('/superAdmin/admin');
          break;
        case 'ADMIN':
          history.push('/admin');
          break;
        case 'MEMBER':
          history.push('/member');
          break;
        case 'TRAINER':
          history.push('/trainer');
          break;
        default: {
          setErrorPop(true);
        }
      }
    }
  };

  return (
    <form className={styles.formSuperAdmin} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.wholeContainer}>
        <h1 className={styles.titleLogin}>Log In</h1>
        <div className={styles.containerForm}>
          <Inputs
            type="email"
            nameInput={'email'}
            nameTitle={'Email'}
            register={register}
            error={errors.email?.message}
            testId="login-input-email"
          />
          <Inputs
            type="password"
            nameInput={'password'}
            nameTitle={'Password'}
            register={register}
            error={errors.password?.message}
            testId="login-input-password"
          />
        </div>
        {errorPop ? (
          <div className={styles.boxError} data-testid="login-error-pop">
            <div className={styles.lineError}>
              <div className={styles.errorLogo}>!</div>
              LogIn Denied
              <div
                onClick={() => {
                  setErrorPop(false);
                }}
                className={styles.close_icon}
              ></div>
            </div>
            <p className={styles.MsgError}>The username or password is incorrect</p>
          </div>
        ) : (
          <div className={styles.emptyBox} data-testid="login-error-pop"></div>
        )}

        <div className={styles.newContainer}>
          <div className={styles.sub_buttons}>
            <Button
              className={styles.buttonLogin}
              clickAction={() => {}}
              text="Enter"
              testId="enter-login-btn"
            />
          </div>
          <div data-testid="password-forgot-btn">
            <button
              className={styles.forgotPass}
              onClick={() => {
                history.push('/auth/recover-password');
              }}
            >
              Forgot Password?
            </button>
          </div>
          <div className={styles.notAccountContainer}>
            <p> Dont have an account?</p>
            <button
              className={styles.forgotPass}
              onClick={() => {
                history.push('/auth/sign-up');
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
