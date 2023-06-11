import { useEffect, useState } from 'react';
import { AddButton, Loader, TableComponent, ToastError } from '../Shared';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllActivities } from '../../redux/activities/thunks';

function Activities() {
  const [activitiesOld, setActivitiesOld] = useState([]);

  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities.list);
  const isPending = useSelector((state) => state.activities.pending);
  const isError = useSelector((state) => state.activities.error);
  const [toastErroOpen, setToastErroOpen] = useState(isError);
  const history = useHistory();

  useEffect(() => {
    getAllActivities(dispatch);
  }, []);

  useEffect(() => {
    console.log(isError);
    setToastErroOpen(isError);
  }, [isError]);

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
      const newActivity = activitiesOld.filter((activity) => activity._id !== id);
      setActivitiesOld(newActivity);
    } catch (error) {
      console.log(error);
    }
  };

  const columnTitleArray = ['Name', 'Description'];
  const columns = ['name', 'description'];

  return (
    <section>
      <AddButton entity="Activity" createMode={createMode} />
      {isPending ? (
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
