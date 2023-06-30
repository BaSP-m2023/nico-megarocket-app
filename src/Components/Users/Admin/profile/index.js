import React from 'react';
import styles from './profile.module.css';
import { InputAdmin, ButtonForm } from 'Components/Shared';

const profilePic = `${process.env.PUBLIC_URL}/assets/images/profile-img.png`;
const editProfilePicBtn = `${process.env.PUBLIC_URL}/assets/images/image.png`;
// admin tiene NAME, email (readonly), city , dni, phone y el edit
const AdminProfile = ({ fullName, testId }) => {
  return (
    <section className={styles.container} data-testid={testId}>
      <div className={styles.profilePhotoContainer} data-testid="photo-container">
        <img src={profilePic} alt="profile image" />
        <img className={styles.editPhotoButton} src={editProfilePicBtn} alt="camera" />
        <h1 className={styles.adminName}>{fullName} Carlos Villagran</h1>
      </div>
      <h2 className={styles.adminInfoTitle}>Personal Information</h2>
      <form className={styles.profileInfoContainer} data-testid="info-container">
        <InputAdmin name={'name'} labelTitle={'Name'} type={'text'} value={'Carlos Villagran'} />
        <InputAdmin name={'dni'} labelTitle={'Document'} type={'text'} value={'42588745'} />
        <InputAdmin name={'city'} labelTitle={'City'} type={'text'} value={'Rosario'} />
        <InputAdmin name={'phone'} labelTitle={'Phone'} type={'text'} value={'3413415487'} />
        <InputAdmin name={'email'} labelTitle={'Email'} type={'email'} value={'email@email.com'} />

        <div className={styles.adminInfoContainer}>
          <p className={styles.adminInfoPlaceholder}>Edit profile</p>
          <ButtonForm
            className={styles.editInfoBtn}
            nameImg="edit-profile-icon.png"
            testId="profile-edit-btn"
          />
        </div>
      </form>
    </section>
  );
};

export default AdminProfile;
