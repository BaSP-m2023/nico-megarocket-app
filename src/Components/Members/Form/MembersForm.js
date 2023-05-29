import React from 'react';
import styles from './form.module.css';

export const Form = ({ member, setMember }) => {
  const handleChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
      isActive: true
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
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
      console.log(response);
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroups}>
          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <label>FirstName</label>
              <input
                className="input"
                name="firstName"
                type="text"
                value={member.firstName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>LastName</label>
              <input
                className="input"
                name="lastName"
                type="text"
                value={member.lastName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>DNI</label>
              <input
                className="input"
                name="dni"
                type="number"
                value={member.dni}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Birthday</label>
              <input
                className="input"
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
                className="input"
                name="phone"
                type="number"
                value={member.phone}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Email</label>
              <input
                className="input"
                name="email"
                type="email"
                value={member.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>City</label>
              <input
                className="input"
                name="city"
                type="text"
                value={member.city}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Postal Code</label>
              <input
                className="input"
                name="postalCode"
                type="number"
                value={member.postalCode}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Membership</label>
              <input
                className="input"
                name="membership"
                type="text"
                value={member.membership}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <button className={styles.submitButton} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
