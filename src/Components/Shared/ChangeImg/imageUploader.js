import React, { useEffect, useState } from 'react';
import { getFirebaseUidFromToken } from 'helper/firebase';
import { getAllAdmins, updateAdmin } from 'redux/admins/thunks';
import { getTrainers, updateTrainer } from 'redux/trainers/thunks';
import { getAllMembers, editMember } from 'redux/members/thunks';
import { useDispatch, useSelector } from 'react-redux';

const ImageUpload = () => {
  const dispatch = useDispatch();
  const [userCurrent, setUserCurrent] = useState('');
  const admins = useSelector((state) => state.admins.list);
  const trainers = useSelector((state) => state.trainers.list);
  const members = useSelector((state) => state.members.list);
  const admin = admins.find((oneAdmin) => oneAdmin.email === userCurrent);
  const member = members.find((oneMember) => oneMember.email === userCurrent);
  const trainer = trainers.find((oneTrainer) => oneTrainer.email === userCurrent);

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
      console.log('entro admin');
      const userEdit = {
        firstName: admin.firstName,
        lastName: admin.lastName,
        dni: admin.dni,
        phone: admin.phone,
        email: admin.email,
        city: admin.city,
        picture: image ? image : ''
      };
      await updateAdmin(dispatch, admin._id, userEdit);
    }
    if (sessionStorage.getItem('role') === 'TRAINER') {
      console.log('entro trainer');
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
      await dispatch(updateTrainer(trainer._id, userEdit));
    }
    if (sessionStorage.getItem('role') === 'MEMBER') {
      console.log('entro member');
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
      await dispatch(editMember(member._id, userEdit));
    }
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Result = reader.result;
        console.log(base64Result);
        setTimeout(() => {
          imageUpload(base64Result);
        }, 1000);
      };
      reader.onerror = (error) => {
        console.log(error);
      };
    } else {
      console.log('entro al else');
    }
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
    <div>
      <input type="file" accept="image/*" onChange={handlePictureChange} />
    </div>
  );
};
export default ImageUpload;
