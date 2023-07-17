import React, { useEffect, useState, useRef } from 'react';
import styles from './changeImg.module.css';
import { getFirebaseUidFromToken } from 'helper/firebase';
import { getAllAdmins, updateAdmin } from 'redux/admins/thunks';
import { getTrainers, updateTrainer } from 'redux/trainers/thunks';
import { getAllMembers, editMember } from 'redux/members/thunks';
import { useDispatch, useSelector } from 'react-redux';
import ToastError from '../Modals/ToastError';
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
  const [toastErrorOpen, setToastErrorOpen] = useState(false);
  const [toastErrorMessage, setToastErrorMessage] = useState('');
  const imgFile = useRef();
  const token = sessionStorage.getItem('token');

  const currentUser = async () => {
    try {
      const emailCurrentUser = await getFirebaseUidFromToken();
      setUserCurrent(emailCurrentUser);
    } catch (error) {
      return error;
    }
  };

  const isImageFile = (file) => {
    const imageTypes = ['image/jpeg', 'image/png'];

    return imageTypes.includes(file.type);
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
      sessionStorage.setItem('img', image);
      await updateAdmin(dispatch, admin._id, userEdit);
      imgFile.current.value = '';
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
      sessionStorage.setItem('img', image);
      await dispatch(updateTrainer(trainer._id, body));
      imgFile.current.value = '';
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
      sessionStorage.setItem('img', image);
      await dispatch(editMember(member._id, body));
      imgFile.current.value = '';
    }
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    if (file && isImageFile(file)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Result = reader.result;
        const size = base64Result.length;
        if (size < 82400) {
          setTimeout(() => {
            imageUpload(base64Result);
          }, 1000);
        } else {
          setTogglePhotoEdit(false);
          imgFile.current.value = '';
          setToastErrorMessage('Image loaded exceeds the allowed size');
          setToastErrorOpen(true);
          setTimeout(() => {
            setToastErrorOpen(false);
          }, 2500);
        }
      };
      reader.onerror = (error) => {
        return {
          message: error,
          data: null,
          error: true
        };
      };
    } else {
      setTogglePhotoEdit(false);
      imgFile.current.value = '';
      setToastErrorMessage('Only .png/.jpeg files are allowed');
      setToastErrorOpen(true);
      setTimeout(() => {
        setToastErrorOpen(false);
      }, 2500);
    }
  };

  const goToDefaultImg = () => {
    const image = '';
    imgFile.current.value = '';
    setTimeout(() => {
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
          <span className={styles.warningMessage}>
            ATTENTION!!!: Images (.png/.jpeg) max weight: 60kb{' '}
          </span>
          <label htmlFor="imgFile" id="labelImgFile" className={styles.loadImgButtonLabel}>
            Load Image
          </label>
          <input
            id="imgFile"
            ref={imgFile}
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
      {toastErrorOpen && (
        <ToastError
          setToastErroOpen={setToastErrorOpen}
          message={toastErrorMessage}
          testId="admin-list-toast-error"
        />
      )}
    </div>
  );
};
export default ImageUpload;
