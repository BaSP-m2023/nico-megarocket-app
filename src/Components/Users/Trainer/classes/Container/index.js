import React, { useState, useEffect } from 'react';
import styles from './container.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSuscription } from 'redux/subscriptions/thunks';
import { useHistory } from 'react-router-dom';

function DivContainerTrainer({ item, testId }) {
  const [membersClass, setMemberClass] = useState([]);
  const dispatch = useDispatch();
  const subscriptions = useSelector((state) => state.subscription.data);
  const history = useHistory();

  const handleToggle = async (item) => {
    let members = [];
    const subscriptionClass = await subscriptions.filter((subs) => subs.classId._id === item._id);
    await subscriptionClass.forEach((element) => {
      members = members.concat(element.members);
    });
    const uniqueMembers = [];
    for (let i = 0; i < members.length; i++) {
      let isDuplicate = false;
      for (let j = 0; j < uniqueMembers.length; j++) {
        if (members[i]._id === uniqueMembers[j]._id) {
          isDuplicate = true;
          break;
        }
      }
      if (!isDuplicate) {
        uniqueMembers.push(members[i]);
      }
    }
    setMemberClass(uniqueMembers);
  };

  useEffect(() => {
    getSuscription(dispatch);
  }, []);

  useEffect(() => {
    handleToggle(item);
  }, [subscriptions]);

  const handleClick = () => {
    history.push(`/trainer/classes/members`, { membersClass });
  };

  return (
    <>
      {item.slots !== 0 ? (
        <div className={styles.classesContainer} onClick={handleClick} data-testid={testId}>
          <p className={styles.textClasses}>{item.activity.name}</p>
          <p className={styles.slotsClasses}>{item.slots} Slots</p>
        </div>
      ) : (
        <div className={styles.classesFullContainer} onClick={handleClick} data-testid={testId}>
          <p className={styles.nameFullClasses}>{item.activity.name}</p>
          <p className={styles.slotsFullClasses}>{item.slots} Slots</p>
        </div>
      )}
    </>
  );
}

export default DivContainerTrainer;
