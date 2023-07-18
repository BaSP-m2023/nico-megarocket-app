import { useEffect, useState } from 'react';
import Cards from './Cards';
import styles from '../activities/activities.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getAllActivities } from 'redux/activities/thunks';
import { Loader } from 'Components/Shared';

const MemberActivities = () => {
  const activities = useSelector((state) => state.activities.list);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllActivities(dispatch);
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.mainContainer}>
          {activities.map((item) => {
            return (
              <Cards
                key={item._id}
                title={item.name}
                description={item.description}
                image={item?.picture}
                testId={`${item.name}-card`}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default MemberActivities;
