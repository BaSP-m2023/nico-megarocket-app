import React, { useEffect, useState } from 'react';
import styles from './changeImg.module.css';
import { getFirebaseUidFromToken } from 'helper/firebase';
import { getAllAdmins, updateAdmin } from 'redux/admins/thunks';
import { getTrainers, updateTrainer } from 'redux/trainers/thunks';
import { getAllMembers, editMember } from 'redux/members/thunks';
import { useDispatch, useSelector } from 'react-redux';
import ButtonForm from '../ButtonForm';

const ImageUpload = ({ setTogglePhotoEdit, photoEdit }) => {
  const dispatch = useDispatch();
  const [userCurrent, setUserCurrent] = useState('');
  const admins = useSelector((state) => state.admins.list);
  const trainers = useSelector((state) => state.trainers.list);
  const members = useSelector((state) => state.members.list);
  const admin = admins.find((oneAdmin) => oneAdmin.email === userCurrent);
  const member = members.find((oneMember) => oneMember.email === userCurrent);
  const trainer = trainers.find((oneTrainer) => oneTrainer.email === userCurrent);
  const token = sessionStorage.getItem('token');

  const currentUser = async () => {
    try {
      const emailCurrentUser = await getFirebaseUidFromToken();
      setUserCurrent(emailCurrentUser);
    } catch (error) {
      return error;
    }
  };

  const imageUpload = async (image) => {
    if (sessionStorage.getItem('role') === 'ADMIN') {
      const userEdit = {
        firstName: admin.firstName,
        lastName: admin.lastName,
        dni: admin.dni,
        phone: admin.phone,
        email: admin.email,
        city: admin.city,
        picture: image ? image : ''
      };
      setTogglePhotoEdit(false);
      await updateAdmin(dispatch, admin._id, userEdit);
    }
    if (sessionStorage.getItem('role') === 'TRAINER') {
      const userEdit = {
        firstName: trainer.firstName,
        lastName: trainer.lastName,
        dni: trainer.dni,
        phone: trainer.phone,
        email: trainer.email,
        city: trainer.city,
        salary: trainer.salary,
        picture: image ? image : ''
      };
      const body = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify(userEdit)
      };
      setTogglePhotoEdit(false);
      await dispatch(updateTrainer(trainer._id, body));
    }
    if (sessionStorage.getItem('role') === 'MEMBER') {
      const userEdit = {
        firstName: member.firstName,
        lastName: member.lastName,
        dni: member.dni,
        birthday: new Date(member.birthday).toISOString().substr(0, 10),
        phone: member.phone,
        city: member.city,
        isActive: member.isActive,
        postalCode: member.postalCode,
        email: member.email,
        membership: member.membership,
        picture: image ? image : ''
      };
      const body = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify(userEdit)
      };
      setTogglePhotoEdit(false);
      await dispatch(editMember(member._id, body));
    }
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Result = reader.result;
        setTimeout(() => {
          sessionStorage.setItem('img', base64Result);
          imageUpload(base64Result);
        }, 1000);
      };
      reader.onerror = (error) => {
        return {
          message: error,
          data: null,
          error: true
        };
      };
    }
  };

  const goToDefaultImg = () => {
    const image = '';
    const imgFile = document.getElementById('imgFile');
    imgFile.value = '';
    setTimeout(() => {
      sessionStorage.removeItem('img');
      imageUpload(image);
    }, 1000);
  };

  useEffect(() => {
    if (sessionStorage.getItem('role') === 'ADMIN') {
      dispatch(getAllAdmins);
    }
    if (sessionStorage.getItem('role') === 'TRAINER') {
      dispatch(getTrainers);
    }
    if (sessionStorage.getItem('role') === 'MEMBER') {
      dispatch(getAllMembers);
    }
  }, []);
  useEffect(() => {
    currentUser();
  }, [admin || trainer || member]);

  return (
    <div className={styles.container}>
      <div className={!photoEdit ? styles.hidden : styles.allButtonsContainer}>
        <div className={styles.loadImgButtonContainer}>
          <span className={styles.warningMessage}>ATTENTION!!!: Images max weight: 60kb </span>
          <label htmlFor="imgFile" id="labelImgFile" className={styles.loadImgButtonLabel}>
            Load Image
          </label>
          <input
            id="imgFile"
            className={styles.loadImgButton}
            type="file"
            accept="image/*"
            onChange={handlePictureChange}
          />
        </div>
        {sessionStorage.getItem('img') && (
          <div className={styles.deleteButton}>
            <ButtonForm nameImg="trash-delete.svg" onAction={goToDefaultImg} testId="delete-btn" />
          </div>
        )}
      </div>
    </div>
  );
};
export default ImageUpload;
