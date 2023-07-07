import React, { useEffect } from 'react';
import Cards from './Cards';
import styles from '../activities/activities.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getAllActivities } from 'redux/activities/thunks';

const MemberActivities = () => {
  const activities = useSelector((state) => state.activities.list);
  const dispatch = useDispatch();
  const activitiesImg = [
    ['Boxing.svg', 'cardBoxing.png'],
    ['Bodybuilding.svg', 'cardBodyBuilding.png'],
    ['Crossfit.svg', 'cardCrossfit.png'],
    ['Spinning.svg', 'cardSpinning.png']
  ];
  const randomImage = () => {
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
            image={randomImage()}
            testId={`${item.name}-card`}
          />
        );
      })}
    </div>
  );
};

export default MemberActivities;
