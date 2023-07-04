import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';
import { ButtonForm, ProfilePicList } from 'Components/Shared';
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
  const defaultProfile = !profilePic ? (
    <div className={styles.defaultImg}>
      <p className={styles.profileInitials}>
        {member?.firstName.charAt()} {member?.lastName.charAt()}
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
        <h2 className={styles.adminInfoTitle}>Personal Information</h2>
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

export default MemberProfile;
