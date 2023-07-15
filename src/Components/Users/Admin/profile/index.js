import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';
import { ButtonForm, Loader, ImageUploader } from 'Components/Shared';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllAdmins } from 'redux/admins/thunks';
import { getFirebaseUidFromToken } from 'helper/firebase';
import 'firebase/compat/auth';
const editProfilePicBtn = `${process.env.PUBLIC_URL}/assets/images/image.png`;

const AdminProfile = ({ testId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userCurrent, setUserCurrent] = useState('');
  const admins = useSelector((state) => state.admins.list);
  const admin = admins.find((oneAdmin) => oneAdmin.email === userCurrent);
  const [profilePic, setProfilePic] = useState('');
  const [photoEdit, setPhotoEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const defaultProfile = (
    <div className={styles.defaultImg}>
      <p className={styles.profileInitials}>
        <span>{admin?.firstName.charAt()}</span> <span>{admin?.lastName.charAt()}</span>
      </p>
    </div>
  );

  const currentUser = async () => {
    try {
      const emailCurrentUser = await getFirebaseUidFromToken();
      setUserCurrent(emailCurrentUser);
    } catch (error) {
      return error;
    }
  };

  const togglePhotoEdit = () => {
    setPhotoEdit(!photoEdit);
  };

  const handleEditClick = () => {
    history.push(`/admin/profile/form/${admin._id}`, { params: { ...admin } });
  };

  useEffect(() => {
    setProfilePic(defaultProfile);
  }, [!profilePic]);

  useEffect(() => {
    setProfilePic(sessionStorage.getItem('img'));
  }, [sessionStorage.getItem('img')]);

  useEffect(() => {
    getAllAdmins(dispatch);
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, []);

  useEffect(() => {
    currentUser();
    if (admin?.picture) {
      sessionStorage.setItem('img', admin.picture);
      setProfilePic(sessionStorage.getItem('img'));
    } else {
      setProfilePic(defaultProfile);
    }
  }, [admin]);

  if (!admin) {
    return null;
  }

  return (
    <div className={styles.wholeContainer}>
      {loading ? (
        <Loader />
      ) : (
        <section className={styles.container} data-testid={testId}>
          <div className={styles.profilePhotoContainer} data-testid="photo-container">
            {sessionStorage.getItem('img') ? (
              <img className={styles.profileImg} src={profilePic} alt="profile image" />
            ) : (
              profilePic
            )}
            <img
              className={styles.editPhotoButton}
              src={editProfilePicBtn}
              onClick={togglePhotoEdit}
              alt="camera"
            />
            <ImageUploader setTogglePhotoEdit={togglePhotoEdit} photoEdit={photoEdit} />
            <h1 className={styles.userName}>
              {admin.firstName} {admin.lastName}
            </h1>
          </div>
          <div className={styles.titleContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={styles.profileIcon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <h2 className={styles.userInfoTitle}>Personal Information</h2>
          </div>
          <div className={styles.profileInfoContainer} data-testid="info-container">
            <p className={styles.userInfoContainer}>
              <span className={styles.userInfoPlaceholder}>Name</span>
              <span className={styles.userInfo}>
                {admin.firstName} {admin.lastName}
              </span>
            </p>
            <p className={styles.userInfoContainer}>
              <span className={styles.userInfoPlaceholder}>Dni</span>
              <span className={styles.userInfo}> {admin.dni}</span>
            </p>
            <p className={styles.userInfoContainer}>
              <span className={styles.userInfoPlaceholder}>City</span>
              <span className={styles.userInfo}> {admin.city}</span>
            </p>
            <p className={styles.userInfoContainer}>
              <span className={styles.userInfoPlaceholder}>Phone</span>
              <span className={styles.userInfo}> {admin.phone}</span>
            </p>
            <p className={styles.userInfoContainer}>
              <span className={styles.userInfoPlaceholder}>Email</span>
              <span className={styles.userInfo}> {admin.email}</span>
            </p>
            <div className={styles.buttonEdit} onClick={handleEditClick}>
              <p>Edit Profile</p>
              <ButtonForm
                className={styles.iconEdit}
                onAction={handleEditClick}
                nameImg="edit.svg"
                testId="profile-edit-btn"
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
export default AdminProfile;
