import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';
import { ButtonForm } from 'Components/Shared';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllAdmins } from 'redux/admins/thunks';
import { getFirebaseUidFromToken } from 'helper/firebase';
import 'firebase/compat/auth';
const profilePic = `${process.env.PUBLIC_URL}/assets/images/profile-img.png`;
const editProfilePicBtn = `${process.env.PUBLIC_URL}/assets/images/image.png`;

const AdminProfile = ({ testId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userCurrent, setUserCurrent] = useState('');
  const admins = useSelector((state) => state.admins.list);
  const admin = admins.find((oneAdmin) => oneAdmin.email === userCurrent);

  const currentUser = async () => {
    try {
      const emailCurrentUser = await getFirebaseUidFromToken();
      setUserCurrent(emailCurrentUser);
    } catch (error) {
      return error;
    }
  };

  const handleEditClick = () => {
    history.push(`/admin/profile/form/${admin._id}`, { params: { ...admin } });
  };

  useEffect(() => {
    getAllAdmins(dispatch);
  }, []);

  useEffect(() => {
    currentUser();
  }, [admin]);

  if (!admin) {
    return null;
  }

  return (
    <div className={styles.wholeContainer}>
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
            <div className={styles.iconEdit}>
              <ButtonForm
                className={styles.editInfoBtn}
                onAction={handleEditClick}
                nameImg="edit-profile-icon.png"
                testId="profile-edit-btn"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default AdminProfile;
