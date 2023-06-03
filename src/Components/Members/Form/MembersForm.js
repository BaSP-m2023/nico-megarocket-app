import React, { useState } from 'react';
import styles from './form.module.css';
import ModalSuccess from '../../Shared/Modals/ModalSuccess/index';
import ModalConfirm from '../../Shared/Modals/ModalConfirm/index';

export const Form = ({ member, setMember }) => {
  const [validationsOk, setValidationsOk] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);

  const handleChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
      isActive: true
    });
    setValidationsOk(true);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await fetch(`${process.env.REACT_APP_API_URL}/member/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: member.firstName,
          lastName: member.lastName,
          dni: member.dni,
          birthday: member.birthday,
          phone: member.phone,
          email: member.email,
          city: member.city,
          postalCode: member.postalCode,
          isActive: member.isActive,
          membership: member.membership
        })
      });
      setModalSuccessOpen(true);
      setSuccessMessage('Member added successfully!');
      setMember({
        firstName: '',
        lastName: '',
        dni: '',
        birthday: '',
        phone: '',
        email: '',
        city: '',
        postalCode: '',
        isActive: false,
        membership: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        {modalAddConfirmOpen && (
          <ModalConfirm
            method="Add"
            onConfirm={handleSubmit}
            setModalConfirmOpen={setModalAddConfirmOpen}
            message="Are you sure you want to edit this member?"
          />
        )}
        {modalSuccessOpen && (
          <ModalSuccess setModalSuccessOpen={setModalSuccessOpen} message={successMessage} />
        )}
      </div>
      <h3 className={styles.title}>Add Member</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <section className={styles.inputGroups}>
          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <label>FirstName</label>
              <input
                className={styles.input}
                name="firstName"
                type="text"
                value={member.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label>LastName</label>
              <input
                className={styles.input}
                name="lastName"
                type="text"
                value={member.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label>DNI</label>
              <input
                className={styles.input}
                name="dni"
                type="number"
                value={member.dni}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Birthday</label>
              <input
                className={styles.input}
                name="birthday"
                type="date"
                value={member.birthday}
                onChange={handleChange}
                required
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
                value={member.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Email</label>
              <input
                className={styles.input}
                name="email"
                type="email"
                value={member.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label>City</label>
              <input
                className={styles.input}
                name="city"
                type="text"
                value={member.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Postal Code</label>
              <input
                className={styles.input}
                name="postalCode"
                type="number"
                value={member.postalCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Membership</label>
              <input
                className={styles.input}
                name="membership"
                type="text"
                value={member.membership}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </section>
        {validationsOk ? (
          <button className={styles.submitButton} type="submit">
            Submit
          </button>
        ) : (
          <button className={styles.submitButton} type="submit" disabled>
            Submit
          </button>
        )}
      </form>
    </div>
  );
};
