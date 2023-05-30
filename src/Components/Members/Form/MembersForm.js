import React, { useState } from 'react';
import styles from './form.module.css';

export const Form = ({ member, setMember }) => {
  const [validationsOk, setValidationsOk] = useState(false);

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
      // eslint-disable-next-line no-unused-vars
      const response = await fetch(`${process.env.REACT_APP_API_URL}/member/`, {
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
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
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
