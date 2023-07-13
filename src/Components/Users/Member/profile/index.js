import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';
import { ButtonForm, ProfilePicList, Loader } from 'Components/Shared';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllMembers } from 'redux/members/thunks';
import { getFirebaseUidFromToken } from 'helper/firebase';
import 'firebase/compat/auth';
const editProfilePicBtn = `${process.env.PUBLIC_URL}/assets/images/image.png`;

const MemberProfile = (testId) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userCurrent, setUserCurrent] = useState('');
  const members = useSelector((state) => state.members.list);
  const member = members.find((oneTrainer) => oneTrainer.email === userCurrent);
  const [profilePic, setProfilePic] = useState('');
  const [photoEdit, setPhotoEdit] = useState(false);
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(true);
  const defaultProfile = !profilePic ? (
    <div className={styles.defaultImg}>
      <p className={styles.profileInitials}>
        <span>{member?.firstName.charAt()}</span> <span>{member?.lastName.charAt()}</span>
      </p>
    </div>
  ) : (
    sessionStorage.getItem('img')
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
    history.push(`/member/profile/form/${member._id}`, { params: { ...member } });
  };

  useEffect(() => {
    getAllMembers(dispatch);
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, []);

  useEffect(() => {
    currentUser();
    setProfilePic(defaultProfile);
  }, [member]);

  if (!member) {
    return null;
  }

  const togglePhotoEdit = () => {
    setCounter(counter + 1);
    setPhotoEdit(!photoEdit);
  };

  return (
    <div className={styles.wholeContainer}>
      {loading ? (
        <Loader />
      ) : (
        <section className={styles.container} data-testid={testId}>
          <div className={styles.profilePhotoContainer} data-testid="photo-container">
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
              {member.firstName} {member.lastName}
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
            <h2 className={styles.adminInfoTitle}>Personal Information</h2>
          </div>
          <div className={styles.profileInfoContainer} data-testid="info-container">
            <p className={styles.adminInfoContainer}>
              <span className={styles.adminInfoPlaceholder}>Name</span>
              <span className={styles.adminInfo}>
                {member.firstName} {member.lastName}
              </span>
            </p>
            <p className={styles.adminInfoContainer}>
              <span className={styles.adminInfoPlaceholder}>Dni</span>
              <span className={styles.adminInfo}>{member.dni}</span>
            </p>
            <p className={styles.adminInfoContainer}>
              <span className={styles.adminInfoPlaceholder}>Date Of Birth</span>
              <span className={styles.adminInfo}>{member.birthday.slice(0, 10)}</span>
            </p>
            <p className={styles.adminInfoContainer}>
              <span className={styles.adminInfoPlaceholder}>City</span>
              <span className={styles.adminInfo}>{member.city} </span>
            </p>
            <p className={styles.adminInfoContainer}>
              <span className={styles.adminInfoPlaceholder}>Postal Code</span>
              <span className={styles.adminInfo}>{member.postalCode}</span>
            </p>
            <p className={styles.adminInfoContainer}>
              <span className={styles.adminInfoPlaceholder}>Phone</span>
              <span className={styles.adminInfo}>{member.phone}</span>
            </p>
            <p className={styles.adminInfoContainer}>
              <span className={styles.adminInfoPlaceholder}>Membership</span>
              <span className={styles.adminInfo}>{member.membership}</span>
            </p>
            <p className={styles.adminInfoContainer}>
              <span className={styles.adminInfoPlaceholder}>Email</span>
              <span className={styles.adminInfo}>{member.email}</span>
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

export default MemberProfile;
