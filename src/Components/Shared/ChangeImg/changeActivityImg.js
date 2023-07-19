import React, { useState, useRef, useEffect } from 'react';
import styles from './changeImg.module.css';
import { updateActivity } from 'redux/activities/thunks';
import { useDispatch } from 'react-redux';
import ToastError from '../Modals/ToastError';
import ButtonForm from '../ButtonForm';

const ChangeActivityImg = ({ activity, send, id, setSend, setImgComing }) => {
  const dispatch = useDispatch();
  const [toastErrorOpen, setToastErrorOpen] = useState(false);
  const [toastErrorMessage, setToastErrorMessage] = useState('');
  const [base64Img, setBase64Img] = useState(activity ? activity.picture : '');
  const imgFileRef = useRef();

  const isImageFile = (file) => {
    const imageTypes = ['image/jpeg', 'image/png'];

    return imageTypes.includes(file.type);
  };

  const imageUpload = async () => {
    const activityEdit = {
      name: activity.name,
      description: activity.description,
      isActive: activity.isActive,
      picture: base64Img
    };
    await updateActivity(dispatch, id, activityEdit);
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
            setBase64Img(base64Result);
          }, 1000);
        } else {
          imgFileRef.current.value = '';
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
      imgFileRef.current.value = '';
      setToastErrorMessage('Only .png/.jpeg files are allowed');
      setToastErrorOpen(true);
      setTimeout(() => {
        setToastErrorOpen(false);
      }, 2500);
    }
  };

  const goToDefaultImg = () => {
    setBase64Img('');
    imgFileRef.current.value = '';
  };

  useEffect(() => {
    if (base64Img !== activity.picture) {
      setImgComing(true);
    }
  }, [base64Img]);

  useEffect(() => {
    if (send) {
      imageUpload();
      setSend(false);
    }
  }, [send]);

  return (
    <div className={styles.imgActivityContainer}>
      <div className={styles.allButtonsContainer}>
        <div className={styles.loadImgButtonContainer}>
          <label htmlFor="imgFile" id="labelImgFile" className={styles.loadImgButtonLabelActivity}>
            Load Image
          </label>
          {base64Img && (
            <>
              <img className={styles.imgPlaceholder} src={base64Img} alt="Img Loaded" />
              <div className={styles.deleteButton}>
                <ButtonForm
                  nameImg="trash-delete.svg"
                  onAction={goToDefaultImg}
                  testId="delete-btn"
                />
              </div>
            </>
          )}
          <input
            id="imgFile"
            ref={imgFileRef}
            className={styles.loadImgButton}
            type="file"
            accept="image/*"
            onChange={handlePictureChange}
          />
        </div>
        {/* <span className={styles.warningMessageActivity}>
          ATTENTION!!!: Images (.png/.jpeg) max weight: 60kb{' '}
        </span> */}
        <div className={styles.warningMessageActivityContainer}>
          <p>ATTENTION!!!</p>
          <p className={styles}>Images (.png/.jpeg) max weight: 60kb </p>
        </div>
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
export default ChangeActivityImg;
