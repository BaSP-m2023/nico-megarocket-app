import React, { useState } from 'react';
import styles from './profile-form.module.css';
import {
  Inputs,
  Button,
  ModalConfirm,
  ModalSuccess,
  ToastError,
  OptionInput
} from 'Components/Shared';
import { editMember } from 'redux/members/thunks';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const schema = Joi.object({
  firstName: Joi.string().min(3).max(15).required(),
  lastName: Joi.string().min(3).max(15).required(),
  dni: Joi.number().min(10000000).max(99999999).required(),
  phone: Joi.string().min(9).max(12).required(),
  city: Joi.string().min(2).max(10).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  postalCode: Joi.string().min(4).max(5).required(),
  membership: Joi.string().valid('Black', 'Classic', 'Only Classes').messages({
    'any.only': 'The membership must be one of Black, Classic, or Only Classes'
  }),
  birthday: Joi.date().required()
});

const MemberProfileForm = () => {
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [toastErroOpen, setToastErroOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('Error in database');
  const memberships = ['Classic', 'Black', 'Only Classes'];
  const [memberToEdit, setMemberToEdit] = useState({});

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const memberData = location.state.params;
  const editMemb = {
    firstName: memberData.firstName,
    lastName: memberData.lastName,
    dni: memberData.dni,
    email: memberData.email,
    phone: memberData.phone,
    city: memberData.city,
    postalCode: memberData.postalCode,
    membership: memberData.membership,
    birthday: new Date(memberData.birthday).toISOString().substr(0, 10)
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: {
      ...editMemb
    }
  });

  const openModal = () => {
    setModalConfirmOpen(true);
  };

  const onSubmit = async (dataMember) => {
    const memberEdit = {
      firstName: dataMember.firstName,
      lastName: dataMember.lastName,
      dni: dataMember.dni,
      phone: dataMember.phone,
      email: dataMember.email,
      city: dataMember.city,
      password: dataMember.password,
      postalCode: dataMember.postalCode,
      membership: dataMember.membership,
      birthday: dataMember.birthday
    };
    setMemberToEdit(memberEdit);
    openModal();
  };

  const submitMember = () => {
    setModalConfirmOpen(false);
    if (Object.keys(errors).length === 0) {
      editionMembers();
    } else {
      setToastMessage('Form validation error');
      setToastErroOpen(true);
    }
  };
  const token = sessionStorage.getItem('token');

  const memberBody = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token: token
    },
    body: JSON.stringify(memberToEdit)
  };

  const editionMembers = async () => {
    try {
      dispatch(editMember(id, memberBody));
      if (!editMemb.error) {
        confirmation();
      } else {
        throw new Error(editMemb.message);
      }
    } catch (error) {
      setToastMessage(error.message);
      setToastErroOpen(true);
    }
  };

  const confirmation = () => {
    setModalSuccessOpen(true);
    setTimeout(() => {
      history.push('/member/profile');
    }, 2000);
  };
  return (
    <div className={styles.containerForm}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.boxInput}>
          <div className={styles.inputForm}>
            <Inputs
              type="text"
              nameInput={'firstName'}
              nameTitle={'Name'}
              register={register}
              error={errors.firstName?.message}
            />
          </div>
          <div className={styles.inputForm}>
            <Inputs
              type="text"
              nameInput={'lastName'}
              nameTitle={'Last Name'}
              register={register}
              error={errors.lastName?.message}
            />
          </div>
        </div>
        <div className={styles.boxInput}>
          <div className={styles.inputForm}>
            <Inputs
              type="text"
              nameInput={'dni'}
              nameTitle={'DNI'}
              register={register}
              error={errors.dni?.message}
            />
          </div>
          <div className={styles.inputForm}>
            <Inputs
              type="text"
              nameInput={'phone'}
              nameTitle={'Phone'}
              register={register}
              error={errors.phone?.message}
            />
          </div>
        </div>
        <div className={styles.boxInput}>
          <div className={styles.inputForm}>
            <Inputs
              type="text"
              nameInput={'city'}
              nameTitle={'City'}
              register={register}
              error={errors.city?.message}
            />
          </div>
          <div className={styles.inputForm}>
            <Inputs
              type="email"
              nameInput={'email'}
              nameTitle={'E-Mail'}
              register={register}
              error={errors.email?.message}
            />
          </div>
        </div>
        <div className={styles.boxInput}>
          <div className={styles.inputForm}>
            <Inputs
              type="number"
              nameInput={'postalCode'}
              nameTitle={'Postal Code'}
              register={register}
              error={errors.postalCode?.message}
            />
          </div>
          <div className={styles.inputForm}>
            <Inputs
              type="date"
              nameInput={'birthday'}
              nameTitle={'Date Of Birth'}
              register={register}
              error={errors.birthday?.message}
            />
          </div>
        </div>
        <div className={styles.boxInput}>
          <div className={styles.optionInputForm}>
            <OptionInput
              name={'membership'}
              dataLabel={'Membership'}
              data={memberships}
              register={register}
              error={errors.membership?.message}
            />
          </div>
        </div>
        <div className={styles.buttonsBox}>
          <Button text="Reset" clickAction={() => reset()} />
          <Button clickAction={() => {}} text="Save" />
          <Button
            clickAction={(e) => {
              e.preventDefault();
              history.goBack();
            }}
            text="Cancel"
          />
        </div>
      </form>
      {modalConfirmOpen && (
        <ModalConfirm
          method={'Edit'}
          message={'Are you sure you want to edit the member?'}
          onConfirm={submitMember}
          setModalConfirmOpen={setModalConfirmOpen}
        />
      )}
      {modalSuccessOpen && (
        <ModalSuccess
          message={'Member edited successfully'}
          setModalSuccessOpen={setModalSuccessOpen}
        />
      )}
      {toastErroOpen && <ToastError setToastErroOpen={setToastErroOpen} message={toastMessage} />}
    </div>
  );
};

export default MemberProfileForm;
