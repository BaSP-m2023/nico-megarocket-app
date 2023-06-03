import React, { useState } from 'react';
import styles from '../Form/form.module.css';
import { ModalConfirm } from '../../Shared';
import { ModalSuccess } from '../../Shared';

export const MembersEditForm = ({
  member,
  updateMember,
  memberID,
  setEditForm,
  setMemberEdited,
  memberEdited
}) => {
  const [modalEditConfirmOpen, setModalEditConfirmOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const {
    firstName,
    lastName,
    dni,
    birthday,
    phone,
    email,
    city,
    postalCode,
    isActive,
    membership
  } = member;

  const [memberUpdated, setMemberUpdated] = useState({
    firstName,
    lastName,
    dni,
    birthday,
    phone,
    email,
    city,
    postalCode,
    isActive,
    membership
  });

  const handleChange = (e) => {
    setMemberUpdated((data) => ({ ...data, [e.target.name]: e.target.value }));
    setMemberEdited({
      firstName: memberEdited.firstName,
      lastName: memberEdited.lastName,
      dni: memberEdited.dni,
      birthday: memberEdited.birthday,
      phone: memberEdited.phone,
      email: memberEdited.email,
      city: memberEdited.city,
      postalCode: memberEdited.postalCode,
      isActive: memberEdited.isActive,
      membership: memberEdited.membership,

      [e.target.name]: e.target.value
    });
  };

  const updateHandler = () => {
    updateMember(memberID, memberUpdated);
    setModalEditConfirmOpen(false);
    setEditForm(false);
    setModalSuccessOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalEditConfirmOpen(true);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Edit Member</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroups}>
          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <label>FirstName</label>
              <input
                className={styles.input}
                name="firstName"
                type="text"
                value={memberEdited.firstName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>LastName</label>
              <input
                className={styles.input}
                name="lastName"
                type="text"
                value={memberEdited.lastName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>DNI</label>
              <input
                className={styles.input}
                name="dni"
                type="number"
                value={memberEdited.dni}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Birthday</label>
              <input
                className={styles.input}
                name="birthday"
                type="date"
                value={memberEdited.birthday}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <label>Phone</label>
              <input
                className={styles.input}
                name="phone"
                type="number"
                value={memberEdited.phone}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Email</label>
              <input
                className={styles.input}
                name="email"
                type="email"
                value={memberEdited.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>City</label>
              <input
                className={styles.input}
                name="city"
                type="text"
                value={memberEdited.city}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Postal Code</label>
              <input
                className={styles.input}
                name="postalCode"
                type="number"
                value={memberEdited.postalCode}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Membership</label>
              <input
                className={styles.input}
                name="membership"
                type="text"
                value={memberEdited.membership}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <button className={styles.submitButton} type="submit">
          Submit
        </button>
      </form>
      <div>
        {modalEditConfirmOpen && (
          <ModalConfirm
            method="Edit"
            onConfirm={updateHandler}
            setModalConfirmOpen={setModalEditConfirmOpen}
            message="Are you sure you want to edit this member?"
          />
        )}

        {modalSuccessOpen && (
          <ModalSuccess
            setModalSuccessOpen={setModalSuccessOpen}
            message="Member updated successfully"
          />
        )}
      </div>
    </div>
  );
};
