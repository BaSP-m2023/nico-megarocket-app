import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';
import { InputAdmin, ButtonForm } from 'Components/Shared';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAdmins } from 'redux/admins/thunks';
import { getFirebaseUidFromToken } from 'helper/firebase';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const profilePic = `${process.env.PUBLIC_URL}/assets/images/profile-img.png`;
const editProfilePicBtn = `${process.env.PUBLIC_URL}/assets/images/image.png`;

const schema = Joi.object({
  firstName: Joi.string().min(3).max(15).required(),
  lastName: Joi.string().min(3).max(15).required(),
  dni: Joi.number().min(10000000).max(99999999).required(),
  phone: Joi.string().min(9).max(12).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  city: Joi.string().min(2).max(10).required()
});

const AdminProfile = ({ testId }) => {
  const dispatch = useDispatch();
  const [admin, setAdmin] = useState({});
  const admins = useSelector((state) => state.admins.list);

  const {
    register
    // handleSubmit,
    // reset,
    // formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: {
      ...admin
    }
  });

  useEffect(() => {
    getAllAdmins(dispatch);
  }, []);

  useEffect(() => {
    currentAdmin();
  }, [admins]);

  const currentAdmin = async () => {
    try {
      const adminCurrent = await getFirebaseUidFromToken();
      console.log(adminCurrent, 'current admin ');
      const thisAdmin = admins.find((admin) => adminCurrent === admin.email);
      console.log(this);
      setAdmin(thisAdmin);
    } catch (error) {
      return error;
    }
  };

  // console.log(admin);

  return (
    <div>
      {admins?.length !== 0 ? (
        <section className={styles.container} data-testid={testId}>
          <div className={styles.profilePhotoContainer} data-testid="photo-container">
            <img src={profilePic} alt="profile image" />
            <img className={styles.editPhotoButton} src={editProfilePicBtn} alt="camera" />
            <h1 className={styles.adminName}>
              {admin.firstName} {admin.lastName}
            </h1>
          </div>
          <h2 className={styles.adminInfoTitle}>Personal Information</h2>
          <form className={styles.profileInfoContainer} data-testid="info-container">
            <InputAdmin
              name={'name'}
              labelTitle={'Name'}
              type={'text'}
              value={`${admin.firstName} ${admin.lastName}`}
              register={register}
            />
            <InputAdmin
              name={'dni'}
              labelTitle={'Document'}
              type={'text'}
              value={admin.dni}
              register={register}
            />
            <InputAdmin
              name={'city'}
              labelTitle={'City'}
              type={'text'}
              value={admin.city}
              register={register}
            />
            <InputAdmin
              name={'phone'}
              labelTitle={'Phone'}
              type={'text'}
              value={admin.phone}
              register={register}
            />
            <InputAdmin
              name={'email'}
              labelTitle={'Email'}
              type={'email'}
              value={admin.email}
              register={register}
            />
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
      ) : (
        <h1> HOLAAAAASDASFDASD</h1>
      )}
    </div>
  );
};

export default AdminProfile;
