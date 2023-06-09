import styles from './activities.module.css';
import { useEffect, useState } from 'react';
import { AddButton, Loader, TableComponent, ToastError } from '../Shared';
import { useHistory } from 'react-router-dom';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [toastErroOpen, setToastErroOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const getActivities = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activity`);
      const data = await response.json();
      setActivities(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setToastErroOpen(true);
    }
  };
  useEffect(() => {
    getActivities();
  }, []);

  const createMode = () => {
    history.push('activities/form', { params: { mode: 'created' } });
  };

  const handleClick = (item) => {
    history.push(`activities/form/${item._id}`, { params: { ...item, mode: 'edit' } });
  };

  const deleteActivity = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/activity/${id}`, {
        method: 'DELETE'
      });
      const newActivity = activities.filter((activity) => activity._id !== id);
      setActivities(newActivity);
    } catch (error) {
      console.log(error);
    }
  };

  const columnTitleArray = ['Name', 'Description'];
  const columns = ['name', 'description'];

  return (
    <section className={styles.container}>
      <AddButton entity="Activity" createMode={createMode} />
      {loading ? (
        <Loader />
      ) : (
        <TableComponent
          columnTitleArray={columnTitleArray}
          data={activities}
          handleClick={handleClick}
          deleteButton={deleteActivity}
          columns={columns}
          autoDelete={() => {}}
        />
      )}
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in Database" />
      )}
    </section>
  );
}

export default Activities;
