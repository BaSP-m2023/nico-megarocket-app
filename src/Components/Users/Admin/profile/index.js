import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';
import { ButtonForm } from 'Components/Shared';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAdmins } from 'redux/admins/thunks';
import { getAuth } from 'firebase/auth';
import 'firebase/compat/auth';

const profilePic = `${process.env.PUBLIC_URL}/assets/images/profile-img.png`;
const editProfilePicBtn = `${process.env.PUBLIC_URL}/assets/images/image.png`;

const AdminProfile = ({ testId }) => {
  const dispatch = useDispatch();
  const [admin, setAdmin] = useState('');
  const admins = useSelector((state) => state.admins.list);
  const auth = getAuth();
  const [decode, setDecode] = useState({});

  setTimeout(() => {
    const idCurrentUser = decode?.claims.email;
    const adminElegido = admins?.find((oneAdmin) => oneAdmin.email === idCurrentUser);
    setAdmin(adminElegido);
  }, 2000);

  // console.log(idCurrentUser, 'email elegido');

  // const currentAdmin = async (idCurrentUser) => {
  //   try {
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   currentAdmin();
  // }, [admins]);

  const fn = async () => {
    const decodedToken = await auth.currentUser.getIdTokenResult();
    setDecode(decodedToken);
    console.log(decodedToken);
  };

  useEffect(() => {
    getAllAdmins(dispatch);
  }, []);

  useEffect(() => {
    fn();
  }, [decode]);

  return (
    <div>
      <section className={styles.container} data-testid={testId}>
        <div className={styles.profilePhotoContainer} data-testid="photo-container">
          <img src={profilePic} alt="profile image" />
          <img className={styles.editPhotoButton} src={editProfilePicBtn} alt="camera" />
          <h1 className={styles.adminName}>
            {admin.firstName} {admin.lastName}
          </h1>
        </div>
        <h2 className={styles.adminInfoTitle}>Personal Information</h2>
        <div className={styles.profileInfoContainer} data-testid="info-container">
          <p className={styles.adminInfoContainer}>
            <span className={styles.adminInfoPlaceholder}>Name</span>
            <span className={styles.adminInfo}>
              {admin.firstName} {admin.lastName}
            </span>
          </p>
          <p className={styles.adminInfoContainer}>
            <span className={styles.adminInfoPlaceholder}>Dni</span>
            <span className={styles.adminInfo}> {admin.dni}</span>
          </p>
          <p className={styles.adminInfoContainer}>
            <span className={styles.adminInfoPlaceholder}>City</span>
            <span className={styles.adminInfo}> {admin.city}</span>
          </p>
          <p className={styles.adminInfoContainer}>
            <span className={styles.adminInfoPlaceholder}>Phone</span>
            <span className={styles.adminInfo}> {admin.phone}</span>
          </p>
          <p className={styles.adminInfoContainer}>
            <span className={styles.adminInfoPlaceholder}>Email</span>
            <span className={styles.adminInfo}> {admin.email}</span>
          </p>

          <div className={styles.adminInfoContainer}>
            <p className={styles.adminInfoPlaceholder}>Edit profile</p>
            <ButtonForm
              className={styles.editInfoBtn}
              nameImg="edit-profile-icon.png"
              testId="profile-edit-btn"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminProfile;
