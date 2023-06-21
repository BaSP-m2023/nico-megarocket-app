import React, { useState, useEffect } from 'react';
import Data from './mockData.json';
import styles from './profile.module.css';

const MemberProfile = () => {
  const profilePicture = `${process.env.PUBLIC_URL}/assets/images/profilePicture.png`;
  const [mockData, setMockData] = useState([]);

  useEffect(() => {
    setMockData(Data[0]);
  }, []);

  return (
    <div className={styles.container}>
      <h1>PROFILE</h1>
      <div className={styles.topContainer}>
        <img src={profilePicture} alt="Picture of Profile" />
        <h3>{mockData.name}</h3>
      </div>
      <div className={styles.botContainer}>
        <div className={styles.containerTitle}>
          <h2>PERSONAL INFORMATION</h2>
        </div>
        <div className={styles.personalContainer}>
          <div className={styles.personalContainerTop}>
            <div className={styles.personalContainerTitle}>
              <p>Name:</p>
              <p>Birthday:</p>
            </div>
            <div className={styles.personalContainerText}>
              <p>{mockData.name}</p>
              <p>{mockData.birthday}</p>
            </div>
          </div>
          <div className={styles.personalContainerBot}>
            <div className={styles.personalContainerTitle}>
              <p>Address:</p>
              <p>Phone:</p>
            </div>
            <div className={styles.personalContainerText}>
              <p>{mockData.address}</p>
              <p>{mockData.phone}</p>
            </div>
          </div>
        </div>
        <div className={styles.containerTitle}>
          <h2>EMAIL</h2>
        </div>
        <div className={styles.containerEmail}>
          <p className={styles.containerEmailTitle}>Email:</p>
          <p className={styles.containerEmailText}>{mockData.email}</p>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
