import React, { useEffect } from 'react';
import styles from './modalInfo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses } from 'redux/classes/thunks';
import { getTrainers } from 'redux/trainers/thunks';
import { ButtonForm } from 'Components/Shared';
import { useHistory } from 'react-router-dom';
import { getAllActivities } from 'redux/activities/thunks';

const ModalInfo = ({ data, setModalInfo }) => {
  const activities = useSelector((state) => state.activities.list);
  const trainers = useSelector((state) => state.trainers.list);
  const trainer = trainers.find((oneTrainer) => oneTrainer._id === data.classId.trainer[0]);
  const activity = activities.find((oneAct) => oneAct._id === data.classId.activity);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    getAllActivities(dispatch);
    getClasses(dispatch);
    getTrainers(dispatch);
  }, []);

  if (activities.length === 0 || !trainers.length === 0) {
    return null;
  }

  return (
    <div className={styles.wholeContainer}>
      <div className={styles.container}>
        <div className={styles.boxClose}>
          <div
            onClick={() => {
              setModalInfo(false);
            }}
            className={styles.close_icon}
          />
        </div>
        <div className={styles.classInfo}>
          <h1 className={styles.titleModal}>{activity.name}</h1>
          <p className={styles.dayText}>{data.classId.day}</p>
          <p className={styles.hourText}>{data.classId.hour}hs</p>
        </div>
        <div className={styles.otherInfo}>
          <p className={styles.trainerInfo}>
            <span className={styles.subTitle}>Trainer:</span>{' '}
            <span className={styles.dataSubTitle}>
              {trainer.firstName} {trainer.lastName}
            </span>
          </p>
          <div className={styles.slotsInfo}>
            <span className={styles.subTitle}>Slots available:</span>{' '}
            <span className={styles.dataSubTitle}>{data.classId.slots}</span>
          </div>
        </div>
        <div className={styles.tableBox}>
          <table className={styles.tableModal}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Dni</th>
              </tr>
            </thead>
            <tbody>
              {data.members.map((item) => (
                <tr key={item._id}>
                  <td>
                    {item.firstName} {item.lastName}
                  </td>
                  <td>{item.email}</td>
                  <td>{item.dni}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.buttonEditBox}>
          <div className={styles.editButton} title="edit subscription">
            <ButtonForm
              nameImg="edit.svg"
              onAction={() => {
                history.push(`/admin/subscriptions/form/${data._id}`, {
                  params: { ...data, mode: 'edit' }
                });
              }}
              testId="edit-btn"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalInfo;
