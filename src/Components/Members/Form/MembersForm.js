import React, { useState, useEffect } from 'react';
import styles from './form.module.css';
import { ModalConfirm, ModalSuccess, ToastError } from '../../Shared';
import { Inputs, Button } from '../../Shared';
import { useLocation, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { addMember, editMember } from '../../../redux/members/thunks';
import { useDispatch, useSelector } from 'react-redux';

export const MembersForm = () => {
  const dispatch = useDispatch();
  const isError = useSelector((state) => state.members.errorForm);
  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [member, setMember] = useState({});
  const [editMode, setEditMode] = useState(null);
  const location = useLocation();
  const history = useHistory();
  const data = location.state.params;
  const { id } = useParams();

  const handleChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
      isActive: true
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalAddConfirmOpen(true);
  };

  useEffect(() => {
    if (id) {
      setEditMode(true);
      setMember({
        firstName: data.firstName,
        lastName: data.lastName,
        dni: data.dni,
        birthday: data.birthday,
        phone: data.phone,
        email: data.email,
        city: data.city,
        postalCode: data.postalCode,
        membership: data.membership
      });
    } else {
      setEditMode(false);
      setMember({
        firstName: '',
        lastName: '',
        dni: '',
        birthday: '',
        phone: '',
        email: '',
        city: '',
        postalCode: '',
        membership: ''
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      {
        <div>
          {modalAddConfirmOpen && (
            <ModalConfirm
              method={editMode ? 'Update' : 'Add'}
              onConfirm={() => onConfirmFunction()}
              setModalConfirmOpen={setModalAddConfirmOpen}
              message={
                editMode
                  ? 'Are sure do you want update this member?'
                  : 'Are sure do you want add this member?'
              }
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={editMode ? 'Member edited' : 'Member added'}
            />
          )}
        </div>
      }
      <h3 className={styles.title}>{editMode ? 'Edit Member' : 'Add Member'}</h3>
      <form className={styles.form}>
        <section className={styles.inputGroups}>
          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="Name"
                text={member.firstName}
                type="text"
                change={handleChange}
                nameInput="firstName"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="Lastname"
                text={member.lastName}
                type="text"
                change={handleChange}
                nameInput="lastName"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="DNI"
                text={member.dni}
                type="text"
                change={handleChange}
                nameInput="dni"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="Birthday"
                text={member.birthday}
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
                text={member.phone}
                type="number"
                change={handleChange}
                nameInput="phone"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="Email"
                text={member.email}
                type="email"
                change={handleChange}
                nameInput="email"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="City"
                text={member.city}
                type="text"
                change={handleChange}
                nameInput="city"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="Postal Code"
                text={member.postalCode}
                type="number"
                change={handleChange}
                nameInput="postalCode"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="Membership"
                text={member.membership}
                type="text"
                change={handleChange}
                nameInput="membership"
                required
              />
            </div>
          </div>
        </section>
        <div className={styles.buttonContainer}>
          <Button clickAction={handleSubmit} text={editMode ? 'Update' : 'Add'} />
          <Button text="Cancel" clickAction={() => history.goBack()} />
        </div>
      </form>
      {toastError && <ToastError setToastErroOpen={setToastErroOpen} message={isError.message} />}
    </div>
  );
};
