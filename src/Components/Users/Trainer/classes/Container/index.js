import React, { useState, useEffect } from 'react';
import styles from './container.module.css';
import ModalConfirm from 'Components/Shared/Modals/ModalConfirm/';
import { updateClass } from 'redux/classes/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { getSuscription, updateSubscriptions } from 'redux/subscriptions/thunks';
import { getAllMembers } from 'redux/members/thunks';
import { getFirebaseUidFromToken } from 'helper/firebase';

function DivContainerTrainer({ item, testId }) {
  const [toggle, setToggle] = useState(true);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [userCurrent, setUserCurrent] = useState('');
  const [memberID, setMemberId] = useState('');
  const dispatch = useDispatch();
  const subscriptions = useSelector((state) => state.subscription.data);
  const members = useSelector((state) => state.members.list);
  const member = members.find((oneMember) => oneMember.email === userCurrent);

  const currentUser = async () => {
    try {
      const emailCurrentUser = await getFirebaseUidFromToken();
      setUserCurrent(emailCurrentUser);
      setMemberId(member._id);
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
    const susbscription = await subscriptions.filter((subs) => {
      return subs.classId._id === idToUpdate;
    });
    const subscriptionID = susbscription[0]._id;
    if (toggle) {
      audioLabel.setAttribute('src', `${process.env.PUBLIC_URL}/assets/sounds/yeahBuddy.mp3`);

      const slotLess = { slots: item.slots - 1 };
      await dispatch(updateClass(idToUpdate, slotLess));

      const memberIds = susbscription[0].members.map((member) => {
        return member._id;
      });
      memberIds.push(memberID);
      await dispatch(
        updateSubscriptions(subscriptionID, {
          members: memberIds
        })
      );
    } else {
      audioLabel.setAttribute('src', `${process.env.PUBLIC_URL}/assets/sounds/lightWeight.mp3`);

      const slotAdd = { slots: item.slots };
      await dispatch(updateClass(idToUpdate, slotAdd));

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
    }
    audioLabel.play();
  };

  const clickActionModal = () => {
    setModalConfirm(true);
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
          method={toggle ? 'Join' : 'Leave'}
          message={
            toggle
              ? '"Are you sure you want to join this class?"'
              : '"Are you sure you want to leave this class?"'
          }
          onConfirm={handleToggle}
          setModalConfirmOpen={setModalConfirm}
        />
      )}
    </>
  );
}

export default DivContainerTrainer;
