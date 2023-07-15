import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './classes.module.css';
import { getClasses } from 'redux/classes/thunks';
import DivContainerTrainer from 'Components/Users/Trainer/classes/Container/';
import { getFirebaseUidFromToken } from 'helper/firebase';
import 'firebase/compat/auth';
import { getTrainers } from 'redux/trainers/thunks';
import { Loader } from 'Components/Shared';

const TrainersClasses = () => {
  const dispatch = useDispatch();
  const [userCurrent, setUserCurrent] = useState('');
  const [loading, setLoading] = useState(true);
  const classes = useSelector((state) => state.classes.list);
  const trainers = useSelector((state) => state.trainers.list);
  const trainer = trainers.find((oneTrainer) => oneTrainer.email === userCurrent);
  const trainerClasses = classes.filter((oneClass) => {
    if (oneClass.trainer[0].email === userCurrent) {
      return oneClass;
    }
  });

  const currentUser = async () => {
    try {
      const emailCurrentUser = await getFirebaseUidFromToken();
      setUserCurrent(emailCurrentUser);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getClasses(dispatch);
    getTrainers(dispatch);
  }, []);

  useEffect(() => {
    currentUser();
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [trainer]);

  if (!trainer) {
    return null;
  }

  const daysArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hoursArray = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00'
  ];
  const tableItem = (item, day, time) => {
    if (item.hour === time && item.day === day) {
      return <DivContainerTrainer item={item} key={item._id} />;
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : trainerClasses.length === 0 ? (
        <div className={styles.notClass}>
          <h1 className={styles.notClassTitle}>
            Welcome, {trainer.firstName} {trainer.lastName}
          </h1>
          <p className={styles.notClassText}>No classes assigned.</p>
        </div>
      ) : (
        <table className={styles.tableContainer}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.daysContainer}>Times</th>
              {daysArray.map((item, index) => {
                return (
                  <th className={styles.daysContainer} key={index}>
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          {hoursArray.map((row, index) => {
            return (
              <tbody key={index}>
                <tr className={styles.trContainer2} key={index}>
                  <td className={styles.trContainer}>{row}</td>
                  {daysArray.map((day) => {
                    return (
                      <td className={styles.tdContainer} key={day}>
                        {trainerClasses.map((item) => {
                          return tableItem(item, day, row);
                        })}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            );
          })}
        </table>
      )}
    </>
  );
};

export default TrainersClasses;
