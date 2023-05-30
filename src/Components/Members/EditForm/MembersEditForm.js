import React, { useState } from 'react';
import styles from '../Form/form.module.css';
import ModalConfirm from '../../Modals/ModalConfirm/index';
import ModalSuccess from '../../Modals/ModalSuccess/index';

export const MembersEditForm = ({ member, updateMember, memberID, setEditForm }) => {
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
  };

  const prueba = () => {
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
                value={memberUpdated.firstName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>LastName</label>
              <input
                className={styles.input}
                name="lastName"
                type="text"
                value={memberUpdated.lastName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>DNI</label>
              <input
                className={styles.input}
                name="dni"
                type="number"
                value={memberUpdated.dni}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Birthday</label>
              <input
                className={styles.input}
                name="birthday"
                type="date"
                value={memberUpdated.birthday}
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
                value={memberUpdated.phone}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Email</label>
              <input
                className={styles.input}
                name="email"
                type="email"
                value={memberUpdated.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>City</label>
              <input
                className={styles.input}
                name="city"
                type="text"
                value={memberUpdated.city}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Postal Code</label>
              <input
                className={styles.input}
                name="postalCode"
                type="number"
                value={memberUpdated.postalCode}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Membership</label>
              <input
                className={styles.input}
                name="membership"
                type="text"
                value={memberUpdated.membership}
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
            onConfirm={prueba}
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
