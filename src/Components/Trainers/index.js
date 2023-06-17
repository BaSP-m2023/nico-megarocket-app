import { useEffect, useState } from 'react';
import { AddButton, Loader, TableComponent, ToastError } from '../Shared';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTrainers, deleteTrainer } from '../../redux/trainers/thunks';

function Trainers() {
  const [toastErroOpen, setToastErroOpen] = useState(false);
  const isLoading = useSelector((state) => state.trainers.pending);
  const isError = useSelector((state) => state.trainers.error);
  const trainers = useSelector((state) => state.trainers.list);
  const history = useHistory();
  const dispatch = useDispatch();

  const createMode = () => {
    history.push('/admin/trainers/form/', { params: { mode: 'created' } });
  };

  const handleClick = (item) => {
    history.push(`/admin/trainers/form/${item._id}`, { params: { ...item, mode: 'edit' } });
  };

  useEffect(() => {
    getTrainers(dispatch);
  }, []);

  useEffect(() => {
    setToastErroOpen(!!isError);
  }, [isError]);

  const columnsTable = ['Trainer', 'DNI', 'Phone', 'Email', 'City', 'Salary/Hour'];
  const columnsValue = ['firstName', 'dni', 'phone', 'email', 'city', 'salary'];

  return (
    <section>
      <AddButton entity="Trainer" createMode={createMode} />
      {isLoading ? (
        <Loader />
      ) : (
        <TableComponent
          columnTitleArray={columnsTable}
          data={trainers}
          handleClick={handleClick}
          deleteButton={deleteTrainer}
          columns={columnsValue}
        />
      )}
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in Database" />
      )}
    </section>
  );
}

export default Trainers;
