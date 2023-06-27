import React, { useState } from 'react';
import styles from './container.module.css';
import ModalConfirm from '../Modals/ModalConfirm';
import { updateClass } from 'redux/classes/thunks';

import { useDispatch } from 'react-redux';

function DivContainer({ item, testId }) {
  const [toggle, setToggle] = useState(true);
  const [modalConfirm, setModalConfirm] = useState(false);
  const dispatch = useDispatch();
  const handleToggle = async () => {
    setToggle(!toggle);
    const audioLabel = document.createElement('audio');
    const idToUpdate = item._id;
    if (toggle) {
      audioLabel.setAttribute('src', `${process.env.PUBLIC_URL}/assets/sounds/yeahBuddy.mp3`);
      const slotLess = { slots: item.slots - 1 };
      await updateClass(idToUpdate, slotLess, dispatch);
    } else {
      audioLabel.setAttribute('src', `${process.env.PUBLIC_URL}/assets/sounds/lightWeight.mp3`);
      const slotAdd = { slots: item.slots };
      await updateClass(idToUpdate, slotAdd, dispatch);
    }
    audioLabel.play();
  };

  const clickActionModal = () => {
    setModalConfirm(true);
  };
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
          method="Join"
          message="Are you sure you want to join this class?"
          onConfirm={handleToggle}
          setModalConfirmOpen={setModalConfirm}
        />
      )}
    </>
  );
}

export default DivContainer;
