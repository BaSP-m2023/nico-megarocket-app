import React, { useState } from 'react';
import styles from './form.module.css';
import { ModalConfirm, ModalSuccess, ToastError } from '../../Shared';
import { Inputs, Button } from '../../Shared';
import { useLocation, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { addMember, editMember } from '../../../redux/members/thunks';
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
        'string.max': 'The first name must be at least 15 characters',
        'string.pattern.base': 'The first name must contain only letters'
      })
      .required(),
    lastName: Joi.string().min(3).max(15).required(),
    dni: Joi.number().min(10000000).max(99999999).integer(),
    birthday: Joi.date().required(),
    phone: Joi.string().min(10).required().messages({
      'number.min': 'Phone number must be at least 10 digits',
      'number.max': 'Phone number must be at most 10 digits'
    }),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    city: Joi.string().min(3).max(15).required(),
    postalCode: Joi.string().min(4).max(5).required().messages({
      'number.min': 'Postal code must be at least 4 digits',
      'number.max': 'Postal code must be at most 5 digits'
    }),
    membership: Joi.string().valid('Black', 'Classic', 'Only_classes').messages({
      'any.only': 'Membership must be one of Black, Classic, or Only_classes'
    }),
    isActive: Joi.boolean().required()
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
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={id ? 'Member edited' : 'Member added'}
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
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.lastName?.message}
                register={register}
                nameTitle="Lastname"
                type="text"
                nameInput="lastName"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.dni?.message}
                register={register}
                nameTitle="DNI"
                type="text"
                nameInput="dni"
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
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.membership?.message}
                register={register}
                nameTitle="Membership"
                type="text"
                nameInput="membership"
                required
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
          <Button clickAction={() => {}} text={id ? 'Update' : 'Add'} />
          <Button clickAction={() => reset()} text="Reset" />
          <Button text="Cancel" clickAction={() => history.goBack()} />
        </div>
      </form>
      {toastError && <ToastError setToastErroOpen={setToastErroOpen} message={isError.message} />}
    </div>
  );
};

export default MembersForm;
