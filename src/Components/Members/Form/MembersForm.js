import React, { useState } from 'react';
import styles from './form.module.css';
import {
  ModalConfirm,
  ModalSuccess,
  ToastError,
  Inputs,
  Button,
  OptionInput
} from 'Components/Shared';
import { useLocation, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { addMember, editMember } from 'redux/members/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const MembersForm = () => {
  const dispatch = useDispatch();
  const isError = useSelector((state) => state.members.errorForm);
  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [member, setMember] = useState({});
  const location = useLocation();
  const history = useHistory();
  const data = location.state.params;
  const { id } = useParams();

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

    membership: Joi.string().valid('Black', 'Classic', 'Only Classes').messages({
      'any.only': 'The membership must be one of Black, Classic, or Only Classes'
    }),

    isActive: Joi.boolean()
      .messages({
        'boolean.base': 'The isActive field must be a boolean',
        'boolean.empty': 'The isActive field is a required field'
      })
      .required()
  });

  const memberUpdate = {
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
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: { ...memberUpdate }
  });

  const onConfirmFunction = async () => {
    if (!id) {
      const addMemberResponse = await dispatch(addMember(member));
      if (addMemberResponse.type === 'ADD_MEMBER_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {
          history.goBack();
        }, 1000);
      }
      return setToastErroOpen(true);
    } else {
      const editMemberResponse = await dispatch(editMember(id, member));
      if (editMemberResponse.type === 'EDIT_MEMBER_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {
          history.goBack();
        }, 1000);
      }
      return setToastErroOpen(true);
    }
  };

  const onSubmit = async (data) => {
    setMember(data);
    setModalAddConfirmOpen(true);
  };

  const memberships = ['Classic', 'Black', 'Only Classes'];

  return (
    <div className={styles.container}>
      {
        <div>
          {modalAddConfirmOpen && (
            <ModalConfirm
              method={id ? 'Update' : 'Add'}
              onConfirm={() => onConfirmFunction()}
              setModalConfirmOpen={setModalAddConfirmOpen}
              message={
                id
                  ? 'Are sure do you want update this member?'
                  : 'Are sure do you want add this member?'
              }
              testId="member-modal-confirm"
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={id ? 'Member edited' : 'Member added'}
              testId="member-modal-success"
            />
          )}
        </div>
      }
      <h3 className={styles.title}>{id ? 'Edit Member' : 'Add Member'}</h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <section className={styles.inputGroups}>
          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.firstName?.message}
                register={register}
                nameTitle="Name"
                type="text"
                nameInput="firstName"
                testId="input-member-name"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.lastName?.message}
                register={register}
                nameTitle="Lastname"
                type="text"
                nameInput="lastName"
                testId="input-member-lastname"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.dni?.message}
                register={register}
                nameTitle="DNI"
                type="text"
                nameInput="dni"
                testId="input-member-dni"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.birthday?.message}
                register={register}
                nameTitle="Birthday"
                type="date"
                nameInput="birthday"
                required
                testId="input-member-birthday"
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.phone?.message}
                register={register}
                nameTitle="Phone"
                type="number"
                nameInput="phone"
                required
                testId="input-member-phone"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.email?.message}
                register={register}
                nameTitle="Email"
                type="email"
                nameInput="email"
                required
                testId="input-member-email"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.city?.message}
                register={register}
                nameTitle="City"
                type="text"
                nameInput="city"
                required
                testId="input-member-city"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.postalCode?.message}
                register={register}
                nameTitle="Postal Code"
                type="number"
                nameInput="postalCode"
                required
                testId="input-member-postalcode"
              />
            </div>
            <div className={styles.inputContainer}>
              <OptionInput
                data={memberships}
                name="membership"
                dataLabel="Membership"
                register={register}
                error={errors.membership?.message}
                required
                testId="input-member-membership"
              />
            </div>
            <div className={styles.inputContainer}>
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
        </section>
        <div className={styles.buttonContainer}>
          <Button clickAction={() => {}} text={id ? 'Update' : 'Add'} testId="member-save-btn" />
          <Button clickAction={() => reset()} text="Reset" testId="member-reset-btn" />
          <Button text="Cancel" clickAction={() => history.goBack()} testId="member-cancel-btn" />
        </div>
      </form>
      {toastError && (
        <ToastError
          setToastErroOpen={setToastErroOpen}
          message={isError.message}
          testId="member-form-toast-error"
        />
      )}
    </div>
  );
};

export default MembersForm;
