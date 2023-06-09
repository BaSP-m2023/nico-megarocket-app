import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './profileMenu.module.css';
import { getAllAdmins } from 'redux/admins/thunks';
import { getAllMembers } from 'redux/members/thunks';
import { getTrainers } from 'redux/trainers/thunks';
import { getFirebaseUidFromToken } from 'helper/firebase';
import { useSelector, useDispatch } from 'react-redux';

const ProfileMenu = () => {
  const locationData = useLocation();
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
        email: admin?.email,
        link: '/admin/profile'
      };
    }
    if (trainer) {
      return {
        firstName: trainer?.firstName,
        lastName: trainer?.lastName,
        email: trainer?.email,
        link: '/trainer/profile'
      };
    }
    if (member) {
      return {
        firstName: member?.firstName,
        lastName: member?.lastName,
        email: member?.email,
        link: '/member/profile'
      };
    }
  };

  const defaultPic = (
    <div className={styles.defaultImg}>
      <p className={styles.profileInitials}>
        <span>{userData()?.firstName.charAt()}</span> <span>{userData()?.lastName.charAt()}</span>
      </p>
    </div>
  );

  useEffect(() => {
    setProfilePic(sessionStorage.getItem('img'));
  }, [sessionStorage.getItem('img')]);

  useEffect(() => {
    setProfilePic(defaultPic);
  }, [!profilePic]);

  useEffect(() => {
    dispatch(getAllAdmins);
    dispatch(getAllMembers);
    dispatch(getTrainers);
  }, []);

  useEffect(() => {
    currentUser();
    if (member) {
      if (member?.picture) {
        sessionStorage.setItem('img', member.picture);
        setProfilePic(sessionStorage.getItem('img'));
      } else {
        setProfilePic(defaultPic);
      }
    }
    if (admin) {
      if (admin?.picture) {
        sessionStorage.setItem('img', admin.picture);
        setProfilePic(sessionStorage.getItem('img'));
      } else {
        setProfilePic(defaultPic);
      }
    }
    if (trainer) {
      if (trainer?.picture) {
        sessionStorage.setItem('img', trainer.picture);
        setProfilePic(sessionStorage.getItem('img'));
      } else {
        setProfilePic(defaultPic);
      }
    }
  }, [admin || trainer || member]);

  return (
    <>
      {locationData.path !== '/auth/recover-password' && (
        <Link to={userData()?.link} className={styles.links}>
          <div className={styles.container}>
            {typeof profilePic === 'string' ? (
              <img src={profilePic} className={styles.profileImg} />
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
        </Link>
      )}
    </>
  );
};

export default ProfileMenu;
