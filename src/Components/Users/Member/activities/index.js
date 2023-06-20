import React from 'react';
import Cards from './Cards';
import styles from '../activities/activities.module.css';
const MemberActivities = () => {
  return (
    <div className={styles.mainContainer}>
      <Cards
        title="Activities"
        description="This is a description to see if this file is working or not"
        image="Boxing.svg"
      />

      <Cards
        title="Activities"
        description="This is a description to see if this file is working or not"
        image="Crossfit.svg"
      />
    </div>
  );
};

export default MemberActivities;
