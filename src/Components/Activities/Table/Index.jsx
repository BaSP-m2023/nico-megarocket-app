import { useState, useEffect } from 'react';
import TableActivity from './TableActivity';
import style from './tableActivity.module.css';

const ActivitiesTable = () => {
  const [activity, setActivity] = useState([]);

  const getActivity = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/activity`);
      const activities = await res.json();
      setActivity(activities.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getActivity();
  }, []);

  const deleteActivityDB = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/activity/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteActivity = async (id) => {
    await deleteActivityDB(id);
    setActivity([...activity.filter((act) => act._id !== id)]);
  };

  return (
    <section className={style.containerTables}>
      <TableActivity activity={activity} deleteActivity={deleteActivity} />
    </section>
  );
};

export default ActivitiesTable;
