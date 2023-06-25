import React, { useEffect } from 'react';
import Cards from './Cards';
import styles from '../activities/activities.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getAllActivities } from 'redux/activities/thunks';

const MemberActivities = () => {
  const activities = useSelector((state) => state.activities.list);
  const dispatch = useDispatch();
  const activitiesImg = ['Boxing.svg', 'Bodybuilding.svg', 'Crossfit.svg', 'Spinning.svg'];
  const ivo = () => {
    const index = Math.floor(Math.random() * activitiesImg.length);
    return activitiesImg[index];
  };

  useEffect(() => {
    getAllActivities(dispatch);
  }, []);

  return (
    <div className={styles.mainContainer}>
      {activities.map((item) => {
        return (
          <Cards
            key={item._id}
            title={item.name}
            description={item.description}
            image={ivo()}
            testId={item.name}
          />
        );
      })}
    </div>
  );
};

export default MemberActivities;
