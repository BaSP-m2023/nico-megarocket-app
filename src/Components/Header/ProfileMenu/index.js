import React, { useEffect, useState } from 'react';
import styles from './profileMenu.module.css';
import { getAllAdmins } from 'redux/admins/thunks';
import { getAllMembers } from 'redux/members/thunks';
import { getTrainers } from 'redux/trainers/thunks';
import { getFirebaseUidFromToken } from 'helper/firebase';
import { useSelector, useDispatch } from 'react-redux';

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const [userCurrent, setUserCurrent] = useState('');
  const admins = useSelector((state) => state.admins.list);
  const members = useSelector((state) => state.members.list);
  const trainers = useSelector((state) => state.trainers.list);
  const admin = admins.find((oneAdmin) => oneAdmin.email === userCurrent);
  const member = members.find((oneMember) => oneMember.email === userCurrent);
  const trainer = trainers.find((oneTrainer) => oneTrainer.email === userCurrent);
  const [profilePic, setProfilePic] = useState('');
  const role = sessionStorage.getItem('role');

  const currentUser = async () => {
    try {
      const emailCurrentUser = await getFirebaseUidFromToken();
      setUserCurrent(emailCurrentUser);
    } catch (error) {
      return error;
    }
  };

  const userData = () => {
    if (admin) {
      return {
        firstName: admin?.firstName,
        lastName: admin?.lastName,
        email: admin?.email
      };
    }
    if (trainer) {
      return {
        firstName: trainer?.firstName,
        lastName: trainer?.lastName,
        email: trainer?.email
      };
    }
    if (member) {
      return {
        firstName: member?.firstName,
        lastName: member?.lastName,
        email: member?.email
      };
    }
  };

  const defaultPic =
    !profilePic && !sessionStorage.getItem('img') ? (
      <div className={styles.defaultImg}>
        <p className={styles.profileInitials}>
          {userData()?.firstName.charAt()} {userData()?.lastName.charAt()}
        </p>
      </div>
    ) : (
      sessionStorage.getItem('img')
    );

  useEffect(() => {
    setProfilePic(sessionStorage.getItem('img'));
  }, [sessionStorage.getItem('img')]);

  useEffect(() => {
    dispatch(getAllAdmins);
    dispatch(getAllMembers);
    dispatch(getTrainers);
  }, []);
  useEffect(() => {
    currentUser();
    setProfilePic(defaultPic);
  }, [admin || trainer || member]);

  console.log(profilePic, 'laPicDelHeader');

  return (
    <>
      <div className={styles.container}>
        {sessionStorage.getItem('img') ? (
          <img className={styles.profileImg} src={profilePic} />
        ) : (
          profilePic
        )}
        <div className={styles.profileInfoContainer}>
          <p className={styles.userName}>
            {userData()?.firstName} {userData()?.lastName}{' '}
            <span className={styles.userRole}>({role})</span>
          </p>
          <p className={styles.userEmail}>{userData()?.email}</p>
        </div>
      </div>
    </>
  );
};

export default ProfileMenu;
