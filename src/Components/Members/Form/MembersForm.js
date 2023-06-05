import React, { useState } from 'react';
import styles from './form.module.css';
import { ModalConfirm } from '../../Shared';
import { ModalSuccess } from '../../Shared';
import { Inputs, OptionInput } from '../../Shared';

export const MembersForm = () => {
  const [validationsOk, setValidationsOk] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [member, setMember] = useState({});
  const memberships = ['Black', 'Classic', 'Only Classes'];

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
              <Inputs nameTitle="Name" type="text" change={handleChange} nameInput="firstName" />
            </div>
            <div className={styles.inputContainer}>
              <Inputs nameTitle="Lastname" type="text" change={handleChange} nameInput="lastName" />
            </div>
            <div className={styles.inputContainer}>
              <Inputs nameTitle="DNI" type="text" change={handleChange} nameInput="dni" />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="Birthday"
                type="date"
                change={handleChange}
                nameInput="birthday"
                required
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="Phone"
                type="number"
                change={handleChange}
                nameInput="phone"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="Email"
                type="email"
                change={handleChange}
                nameInput="email"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="City"
                type="text"
                change={handleChange}
                nameInput="city"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="Postal Code"
                type="number"
                change={handleChange}
                nameInput="postalCode"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <OptionInput dataOptions={memberships} />
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
