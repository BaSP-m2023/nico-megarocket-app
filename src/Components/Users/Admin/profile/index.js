import React from 'react';
import styles from './profile.module.css';
import { ButtonForm } from '../../../Shared';

const profilePic = `${process.env.PUBLIC_URL}/assets/images/profile-img.png`;
const editProfilePicBtn = `${process.env.PUBLIC_URL}/assets/images/image.png`;

const AdminProfile = ({ fullName, height, weight, sex, city, document, email }) => {
  return (
    <section className={styles.container}>
      <div className={styles.profilePhotoContainer}>
        <img src={profilePic} alt="profile image" />
        <img className={styles.editPhotoButton} src={editProfilePicBtn} alt="camera" />
        <h1 className={styles.adminName}>{fullName} Carlos Villagran</h1>
      </div>
      <div className={styles.profileInfoContainer}>
        <h2 className={styles.adminInfoTitle}>Personal Information</h2>
        <p className={styles.adminInfoContainer}>
          <span className={styles.adminInfoPlaceholder}>Name</span>
          <span className={styles.adminInfo}>{fullName} Carlos Villagran</span>
        </p>
        <p className={styles.adminInfoContainer}>
          <span className={styles.adminInfoPlaceholder}>Height | Weight</span>
          <span className={styles.adminInfo}>
            {height}1.7m | {weight}77kg
          </span>
        </p>
        <p className={styles.adminInfoContainer}>
          <span className={styles.adminInfoPlaceholder}>Sex</span>
          <span className={styles.adminInfo}>{sex} Male</span>
        </p>
        <p className={styles.adminInfoContainer}>
          <span className={styles.adminInfoPlaceholder}>City</span>
          <span className={styles.adminInfo}>{city} Guadalajara</span>
        </p>
        <p className={styles.adminInfoContainer}>
          <span className={styles.adminInfoPlaceholder}>Document</span>
          <span className={styles.adminInfo}>{document} 12345678</span>
        </p>
        <p className={styles.adminInfoContainer}>
          <span className={styles.adminInfoPlaceholder}>Phone</span>
          <span className={styles.adminInfo}>{document} 1234512344</span>
        </p>
        <p className={styles.adminInfoContainer}>
          <span className={styles.adminInfoPlaceholder}>Email</span>
          <span className={styles.adminInfo}>{email} carlosvillagran@gmail.com</span>
        </p>
        <p className={styles.adminInfoContainer}>
          <span className={styles.adminInfoPlaceholder}>Edit profile</span>
          <ButtonForm className={styles.editInfoBtn} nameImg="edit-profile-icon.png" />{' '}
        </p>
      </div>
    </section>
  );
};

export default AdminProfile;
