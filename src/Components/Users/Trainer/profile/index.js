import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';
import { ButtonForm, ProfilePicList } from 'Components/Shared';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getTrainers } from 'redux/trainers/thunks';
import { getFirebaseUidFromToken } from 'helper/firebase';
import 'firebase/compat/auth';
const editProfilePicBtn = `${process.env.PUBLIC_URL}/assets/images/image.png`;

const TrainerProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userCurrent, setUserCurrent] = useState('');
  const trainers = useSelector((state) => state.trainers.list);
  const trainer = trainers.find((oneTrainer) => oneTrainer.email === userCurrent);
  const [profilePic, setProfilePic] = useState('');
  const [photoEdit, setPhotoEdit] = useState(false);
  const [counter, setCounter] = useState(0);
  const defaultProfile = (
    <div className={styles.defaultImg}>
      <p className={styles.profileInitials}>
        {trainer?.firstName.charAt()} {trainer?.lastName.charAt()}
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

  const handleEditClick = () => {
    history.push(`/trainer/profile/form/${trainer._id}`, { params: { ...trainer } });
  };

  useEffect(() => {
    getTrainers(dispatch);
  }, []);

  useEffect(() => {
    currentUser();
    setProfilePic(defaultProfile);
  }, [trainer]);

  if (!trainer) {
    return null;
  }
  const togglePhotoEdit = () => {
    setCounter(counter + 1);
    setPhotoEdit(!photoEdit);
  };

  return (
    <div className={styles.wholeContainer}>
      <section className={styles.container}>
        <div className={styles.profilePhotoContainer}>
          {typeof profilePic === 'string' ? (
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
          <ProfilePicList
            profilePic={setProfilePic}
            photoEdit={setPhotoEdit}
            show={photoEdit}
            counter={counter}
          />
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
