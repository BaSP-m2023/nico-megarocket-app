import React, { useState } from 'react';
import styles from './form.module.css';
import { ModalConfirm } from '../../Shared/';

const Form = ({
  addAdmin,
  closedForm,
  adminToEditId,
  editMode,
  adminEdited,
  setAdminEdited,
  finalEdit
}) => {
  const [admin, setAdmin] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    dni: '',
    password: ''
  });

  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);

  const addAdmins = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(admin)
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value
    });
  };

  const openModal = (e) => {
    e.preventDefault();
    setModalConfirmOpen(true);
  };

  const onChangeEdit = (e) => {
    setAdminEdited({
      firstName: adminEdited.firstName,
      lastName: adminEdited.lastName,
      phone: adminEdited.phone,
      email: adminEdited.email,
      city: adminEdited.city,
      dni: adminEdited.dni,
      password: adminEdited.password,

      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      finalEdit(adminToEditId);
    } else {
      addAdmin(admin);
      setAdmin({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        city: '',
        dni: '',
        password: ''
      });
      addAdmins();
    }
    closedForm();
  };

  const closeForm = (e) => {
    e.preventDefault();
    closedForm();
  };
  return (
    <div className={styles.containerForm}>
      <form className={styles.form}>
        <div className={styles.subContainer}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Name</label>
            {editMode ? (
              <input
                className={styles.input}
                name="firstName"
                type="text"
                value={adminEdited.firstName}
                required
                onChange={onChangeEdit}
              />
            ) : (
              <input
                className={styles.input}
                name="firstName"
                type="text"
                value={admin.firstName}
                required
                onChange={onChange}
              />
            )}
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Last Name</label>
            {editMode ? (
              <input
                className={styles.input}
                name="lastName"
                type="text"
                value={adminEdited.lastName}
                required
                onChange={onChangeEdit}
              />
            ) : (
              <input
                className={styles.input}
                name="lastName"
                type="text"
                required
                value={admin.lastName}
                onChange={onChange}
              />
            )}
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>DNI</label>
            {editMode ? (
              <input
                className={styles.input}
                name="dni"
                type="text"
                value={adminEdited.dni}
                required
                onChange={onChangeEdit}
              />
            ) : (
              <input
                className={styles.input}
                name="dni"
                type="text"
                required
                value={admin.dni}
                onChange={onChange}
              />
            )}
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Phone</label>
            {editMode ? (
              <input
                className={styles.input}
                name="phone"
                type="text"
                value={adminEdited.phone}
                required
                onChange={onChangeEdit}
              />
            ) : (
              <input
                className={styles.input}
                name="phone"
                type="text"
                required
                value={admin.phone}
                onChange={onChange}
              />
            )}
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Email</label>
            {editMode ? (
              <input
                className={styles.input}
                name="email"
                type="text"
                value={adminEdited.email}
                required
                onChange={onChangeEdit}
              />
            ) : (
              <input
                className={styles.input}
                name="email"
                type="text"
                required
                value={admin.email}
                onChange={onChange}
              />
            )}
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>City</label>
            {editMode ? (
              <input
                className={styles.input}
                name="city"
                type="text"
                value={adminEdited.city}
                required
                onChange={onChangeEdit}
              />
            ) : (
              <input
                className={styles.input}
                name="city"
                type="text"
                required
                value={admin.city}
                onChange={onChange}
              />
            )}
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Password</label>
            {editMode ? (
              <input
                className={styles.input}
                name="password"
                type="text"
                value={adminEdited.password}
                required
                onChange={onChangeEdit}
              />
            ) : (
              <input
                className={styles.input}
                name="password"
                type="password"
                required
                value={admin.password}
                onChange={onChange}
              />
            )}
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Repeat Password</label>
            <input
              className={styles.input}
              name="repeatPassword"
              type="password"
              required
              value={admin.repeatPassword}
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={openModal}>
            Save
          </button>
          <button className={styles.button} onClick={closeForm}>
            Cancel
          </button>
        </div>
      </form>
      {modalConfirmOpen && (
        <ModalConfirm
          method={editMode ? 'Edit' : 'Create'}
          message={
            editMode
              ? 'Are you sure you want to edit the admin?'
              : 'Are you sure you want to add the admin?'
          }
          onConfirm={onSubmit}
          setModalConfirmOpen={setModalConfirmOpen}
        />
      )}
    </div>
  );
};

export default Form;
