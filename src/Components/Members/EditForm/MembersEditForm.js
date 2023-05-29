import React from 'react';
import styles from '../Form/form.module.css';

export const MembersEditForm = ({ member, setMember, updateMember, memberID }) => {
  const handleChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
      isActive: true
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMember(memberID, member);
  };

  return (
    <div>
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
