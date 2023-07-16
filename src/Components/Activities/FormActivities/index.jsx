import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import style from './modalAdd.module.css';
import {
  ModalConfirm,
  ModalSuccess,
  Inputs,
  Button,
  ToastError,
  TextArea,
  Loader,
  ButtonForm
} from 'Components/Shared';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { addActivity, updateActivity } from 'redux/activities/thunks';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const ModalAddActivity = () => {
  const dispatch = useDispatch();
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [modalUpdateConfirmOpen, setModalUpdateConfirmOpen] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastErrorImg, setToastErrorImg] = useState(false);
  const [imgErrorMsg, setImgErrorMsg] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [inputForm, setInputForm] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();
  const isError = useSelector((store) => store.activities.formError);
  const isPending = useSelector((state) => state.activities.pending);
  const updateData = location.state.params;
  const [base64img, setBase64Img] = useState('');
  const imgFile = document.getElementById('imageFile');

  const validationSchema = Joi.object({
    name: Joi.string()
      .pattern(/^[A-Za-z\s]{2,30}$/)
      .required()
      .min(2)
      .max(30)
      .messages({
        'string.base': 'Name must be a string',
        'string.min': 'Name must be at last 2 characters',
        'string.max': 'Name must contain at last 30 characters'
      }),
    description: Joi.string()
      .min(2)
      .max(100)
      .messages({
        'string.base': 'Description must be a string',
        'string.min': 'Description must be at last 3 characters',
        'string.max': 'Description invalid lenght'
      })
      .required(),
    isActive: Joi.boolean().required().default(true)
  });

  const updateActivityData = {
    name: updateData.name,
    description: updateData.description,
    isActive: updateData.isActive,
    picture: updateData.picture
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(validationSchema),
    defaultValues: {
      ...updateActivityData
    }
  });

  useEffect(() => {
    if (updateData.mode === 'edit') {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, []);

  useEffect(() => {
    setToastError(!!isError);
  }, [isError]);

  useEffect(() => {
    if (!isPending) {
      setShowLoader(true);
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPending]);

  const handleUpdateButtonClick = () => {
    setModalUpdateConfirmOpen(true);
  };

  const formSubmit = async () => {
    if (id) {
      const putActivity = await updateActivity(dispatch, id, inputForm);
      if (putActivity.type === 'UPDATE_ACTIVITIES_SUCCESS') {
        setModalSuccessOpen(true);
        setTimeout(() => {
          history.goBack();
        }, 1000);
      }
    } else {
      const postActivity = await addActivity(dispatch, inputForm);
      if (postActivity.type === 'ADD_ACTIVITIES_SUCCESS') {
        setModalSuccessOpen(true);
        setTimeout(() => {
          history.goBack();
        }, 1000);
      }
    }
  };

  const isImageFile = (file) => {
    const imageTypes = ['image/jpeg', 'image/png'];

    return imageTypes.includes(file.type);
  };

  const imageUpload = async (image) => {
    const activityEdit = {
      name: updateData.name,
      description: updateData.description,
      isActive: updateData.isActive,
      picture: image ? image : ''
    };
    await updateActivity(dispatch, id, activityEdit);
    imgFile.value = '';
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
          imgFile.value = '';
          setImgErrorMsg('Image loaded exceeds the allowed size');
          setToastErrorImg(true);
          setTimeout(() => {
            setToastErrorImg(false);
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
      imgFile ? (imgFile.value = '') : '';
      setImgErrorMsg('Only .png/.jpeg files are allowed');
      setToastErrorImg(true);
      setTimeout(() => {
        setToastErrorImg(false);
      }, 2500);
    }
  };

  const goToDefaultImg = () => {
    const image = '';
    imgFile.value = image;
    setTimeout(() => {
      imageUpload(image);
    }, 1000);
  };

  const onSubmit = async (data) => {
    console.log(data);
    imageUpload(base64img);
    setInputForm(data);
    handleUpdateButtonClick();
  };

  return (
    <>
      {showLoader ? (
        <Loader testId="activity-table-loader" />
      ) : (
        <section className={style.containerModal}>
          <form className={style.containerForm} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={style.title}>{id ? 'Edit Activity' : 'Add Activity'}</h3>
            <div className={style.inputContainer}>
              <Inputs
                nameTitle="Name"
                register={register}
                nameInput="name"
                type="text"
                error={errors.name?.message}
                testId="input-activity-name"
              />
              <TextArea
                nameTitle={'Description'}
                nameInput={'description'}
                register={register}
                error={errors.description?.message}
                testId="input-activity-description"
              />
              {!id && (
                <input
                  {...register('isActive', {
                    required: { value: true, message: 'This field is required' }
                  })}
                  type="hidden"
                  name="isActive"
                  value={true}
                />
              )}
            </div>
            <div className={style.containerAddButton}>
              <Button
                clickAction={() => {}}
                text={id ? 'Save' : 'Add'}
                testId="activity-save-btn"
              />
              <Button clickAction={() => reset()} text="Reset" testId="activity-reset-btn" />
              <Button
                clickAction={() => history.goBack()}
                text="Cancel"
                testId="activity-cancel-btn"
              />
            </div>
          </form>
          <>
            <div className={style.loadImgContainer}>
              <label htmlFor="imageFile" className={style.loadImgButtonLabel}>
                Image
              </label>
              <input
                id="imageFile"
                className={style.loadImgButton}
                type="file"
                accept="image/*"
                onChange={handlePictureChange}
              />
              <div>{imgFile?.value}</div>
            </div>
            <span className={style.warningMessage}>
              ATTENTION!!!: Images (.png/.jpeg) max weight: 60kb{' '}
            </span>
            {updateData.picture && (
              <div className={style.deleteButton}>
                <ButtonForm
                  nameImg="trash-delete.svg"
                  onAction={goToDefaultImg}
                  testId="delete-btn"
                />
              </div>
            )}
          </>
          {modalUpdateConfirmOpen && (
            <ModalConfirm
              method={editMode ? 'Edit' : 'Create'}
              onConfirm={formSubmit}
              message={
                editMode
                  ? 'Are you sure you want to update this Activity?'
                  : 'Are you sure you want to add this Activity?'
              }
              setModalConfirmOpen={setModalUpdateConfirmOpen}
              testId="activity-modal-confirm"
            />
          )}
          {modalSuccessOpen && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message="Activity added successfully"
              testId="activity-modal-success"
            />
          )}
          {toastError && (
            <ToastError
              setToastErroOpen={setToastError}
              message={isError}
              testId="activity-form-toast-error"
            />
          )}
          {toastErrorImg && (
            <ToastError
              setToastErroOpen={setToastErrorImg}
              message={imgErrorMsg}
              testId="activity-form-toast-error-img"
            />
          )}
        </section>
      )}
    </>
  );
};

export default ModalAddActivity;
