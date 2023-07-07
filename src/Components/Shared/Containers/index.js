import React, { useState, useEffect } from 'react';
import styles from './container.module.css';
import ModalConfirm from '../Modals/ModalConfirm';
import { updateClass } from 'redux/classes/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { getSuscription, addSubscriptions, updateSubscriptions } from 'redux/subscriptions/thunks';
import { getAllMembers } from 'redux/members/thunks';
import { getFirebaseUidFromToken } from 'helper/firebase';
import ToastError from '../Modals/ToastError';
import ModalSuccess from '../Modals/ModalSuccess';

function DivContainer({ item, testId }) {
  const [toggle, setToggle] = useState(true);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState('');
  const [messageConfirm, setMessageConfirm] = useState('');
  const [methodConfirm, setMethodConfirm] = useState('');
  const [toastErroOpen, setToastErroOpen] = useState(false);
  const [userCurrent, setUserCurrent] = useState('');
  const [memberID, setMemberId] = useState('');
  const [memberState, setMemberState] = useState(false);
  const dispatch = useDispatch();
  const subscriptions = useSelector((state) => state.subscription.data);
  const members = useSelector((state) => state.members.list);
  const member = members.find((oneMember) => oneMember.email === userCurrent);

  const currentUser = async () => {
    try {
      const emailCurrentUser = await getFirebaseUidFromToken();
      setUserCurrent(emailCurrentUser);
      setMemberId(member._id);
      setMemberState(member.isActive);
      existMemberInClass(memberID);
    } catch (error) {
      return error;
    }
  };

  const existMemberInClass = (memberID) => {
    const { _id: classId } = item;
    const classInSubscription = subscriptions.find((sub) => sub.classId._id === classId);
    if (classInSubscription) {
      classInSubscription.members.map((memberInSub) => {
        if (memberInSub._id === memberID) {
          setToggle(false);
        }
      });
    }
  };

  const handleToggle = async () => {
    setToggle(!toggle);
    const audioLabel = document.createElement('audio');
    const idToUpdate = item._id;
    let susbscription = await subscriptions.filter((subs) => {
      return subs.classId._id === idToUpdate;
    });
    if (!susbscription.length) {
      const newSub = {
        classId: idToUpdate,
        members: [memberID],
        date: new Date()
      };
      const createSubscription = await addSubscriptions(dispatch, newSub);
      if (createSubscription.type === 'POST_SUBSCRIPTION_SUCCESS') {
        susbscription = await subscriptions.filter((subs) => {
          return subs.classId._id === idToUpdate;
        });
        audioLabel.setAttribute('src', `${process.env.PUBLIC_URL}/assets/sounds/yeahBuddy.mp3`);
        const slotLess = { slots: item.slots - 1 };
        const classBody = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(slotLess)
        };
        await dispatch(updateClass(idToUpdate, classBody));

        setMessageSuccess('Added');
        setModalSuccess(true);
        setTimeout(() => setModalSuccess(false), 1000);
        audioLabel.play();
        return;
      }
    }
    const subscriptionID = susbscription[0]._id;
    if (toggle) {
      audioLabel.setAttribute('src', `${process.env.PUBLIC_URL}/assets/sounds/yeahBuddy.mp3`);

      const slotLess = { slots: item.slots - 1 };
      const classBody = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(slotLess)
      };
      await dispatch(updateClass(idToUpdate, classBody));

      const memberIds = susbscription[0].members.map((member) => {
        return member._id;
      });
      memberIds.push(memberID);
      await dispatch(
        updateSubscriptions(subscriptionID, {
          members: memberIds
        })
      );
      setMessageSuccess('Added');
      setModalSuccess(true);
      setTimeout(() => setModalSuccess(false), 1000);
    } else {
      audioLabel.setAttribute('src', `${process.env.PUBLIC_URL}/assets/sounds/lightWeight.mp3`);

      const slotAdd = { slots: item.slots + 1 };
      const classBody = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(slotAdd)
      };
      await dispatch(updateClass(idToUpdate, classBody));

      const memberWithoutCurrent = susbscription[0].members.filter(
        (memberInArray) => memberInArray._id !== memberID
      );
      const memberIds = memberWithoutCurrent.map((member) => {
        return member._id;
      });
      await dispatch(
        updateSubscriptions(subscriptionID, {
          members: memberIds
        })
      );
      setMessageSuccess('Removed');
      setModalSuccess(true);
      setTimeout(() => setModalSuccess(false), 1000);
    }
    audioLabel.play();
  };

  const clickActionModal = () => {
    if (memberState) {
      setModalConfirm(true);
      if (toggle) {
        setMessageConfirm('Are you sure you want to join this class?');
        setMethodConfirm('Join');
      } else {
        setMessageConfirm('Are you sure you want to leave this class?');
        setMethodConfirm('Leave');
      }
    } else {
      setToastErroOpen(true);
    }
  };

  useEffect(() => {
    getSuscription(dispatch);
    getAllMembers(dispatch);
  }, []);

  useEffect(() => {
    currentUser();
  }, [member]);

  return (
    <>
      {item.slots !== 0 ? (
        <div
          className={toggle ? styles.classesContainer : styles.selectedContainer}
          onClick={() => clickActionModal()}
          data-testid={testId}
        >
          <p className={toggle ? styles.textClasses : styles.textSelectedClasses}>
            {item.activity.name}
          </p>
          <p className={toggle ? styles.slotsClasses : styles.slotsSelectedClasses}>
            {item.slots} Slots
          </p>
        </div>
      ) : (
        <div className={item.slots === 0 && styles.classesFullContainer} data-testid={testId}>
          <p className={item.slots === 0 ? styles.nameFullClasses : styles.nameClasses}>
            {item.activity.name}
          </p>
          <p className={item.slots === 0 ? styles.slotsFullClasses : styles.slotsClasses}>
            {item.slots} Slots
          </p>
        </div>
      )}
      {modalConfirm && (
        <ModalConfirm
          method={methodConfirm}
          message={messageConfirm}
          onConfirm={handleToggle}
          setModalConfirmOpen={setModalConfirm}
        />
      )}
      {modalSuccess && (
        <ModalSuccess setModalSuccessOpen={setModalSuccess} message={messageSuccess} />
      )}
      {toastErroOpen && (
        <ToastError
          setToastErroOpen={setToastErroOpen}
          message={'You are not an active member, please consult with an administrator.'}
          testId="class-join-toast-error"
        />
      )}
    </>
  );
}

export default DivContainer;
