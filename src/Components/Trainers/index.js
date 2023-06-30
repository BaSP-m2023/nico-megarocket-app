import { useEffect, useState } from 'react';
import { AddButton, TableComponent, ToastError } from 'Components/Shared';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTrainers, deleteTrainer } from 'redux/trainers/thunks';

function Trainers() {
  const [toastErroOpen, setToastErroOpen] = useState(false);
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

      <TableComponent
        columnTitleArray={columnsTable}
        data={trainers}
        handleClick={handleClick}
        deleteButton={deleteTrainer}
        columns={columnsValue}
        trainers={trainers}
      />
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in Database" />
      )}
    </section>
  );
}

export default Trainers;
