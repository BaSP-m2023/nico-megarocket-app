import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';
import { ButtonForm } from 'Components/Shared';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getTrainers } from 'redux/trainers/thunks';
import { getFirebaseUidFromToken } from 'helper/firebase';
import 'firebase/compat/auth';
const profilePic = `${process.env.PUBLIC_URL}/assets/images/profile-img.png`;
const editProfilePicBtn = `${process.env.PUBLIC_URL}/assets/images/image.png`;

const TrainerProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userCurrent, setUserCurrent] = useState('');
  const trainers = useSelector((state) => state.trainers.list);
  const trainer = trainers.find((oneTrainer) => oneTrainer.email === userCurrent);

  const currentUser = async () => {
    try {
      const emailCurrentUser = await getFirebaseUidFromToken();
      setUserCurrent(emailCurrentUser);
    } catch (error) {
      return error;
    }
  };

  const handleEditClick = () => {
    history.push(`/trainer/profile/form/${trainer._id}`, { params: { ...trainer } });
  };

  useEffect(() => {
    getTrainers(dispatch);
  }, []);

  useEffect(() => {
    currentUser();
  }, [trainer]);

  if (!trainer) {
    return null;
  }
  return (
    <div className={styles.wholeContainer}>
      <section className={styles.container}>
        <div className={styles.profilePhotoContainer}>
          <img src={profilePic} alt="profile image" />
          <img className={styles.editPhotoButton} src={editProfilePicBtn} alt="camera" />
          <h1 className={styles.adminName}>
            {trainer.firstName} {trainer.lastName}
          </h1>
        </div>
        <h2 className={styles.adminInfoTitle}>Personal Information</h2>
        <div className={styles.profileInfoContainer} data-testid="info-container">
          <p className={styles.adminInfoContainer}>
            <span className={styles.adminInfoPlaceholder}>Name</span>
            <span className={styles.adminInfo}>
              {trainer.firstName} {trainer.lastName}
            </span>
          </p>
          <p className={styles.adminInfoContainer}>
            <span className={styles.adminInfoPlaceholder}>Dni</span>
            <span className={styles.adminInfo}> {trainer.dni}</span>
          </p>
          <p className={styles.adminInfoContainer}>
            <span className={styles.adminInfoPlaceholder}>City</span>
            <span className={styles.adminInfo}> {trainer.city}</span>
          </p>
          <p className={styles.adminInfoContainer}>
            <span className={styles.adminInfoPlaceholder}>Phone</span>
            <span className={styles.adminInfo}> {trainer.phone}</span>
          </p>
          <p className={styles.adminInfoContainer}>
            <span className={styles.adminInfoPlaceholder}>Email</span>
            <span className={styles.adminInfo}> {trainer.email}</span>
          </p>
          <div className={styles.adminInfoContainer}>
            <p className={styles.adminInfoPlaceholder}>Edit profile</p>
            <ButtonForm
              className={styles.editInfoBtn}
              onAction={handleEditClick}
              nameImg="edit-profile-icon.png"
              testId="profile-edit-btn"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrainerProfile;
