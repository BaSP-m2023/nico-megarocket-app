import { useEffect, useState } from 'react';
import { AddButton, TableComponent, ToastError, Loader } from 'Components/Shared';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTrainers, deleteTrainer } from 'redux/trainers/thunks';

function Trainers() {
  const [toastErroOpen, setToastErroOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const isError = useSelector((state) => state.trainers.error);
  const trainers = useSelector((state) => state.trainers.list);
  const isPending = useSelector((state) => state.trainers.pending);
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

  useEffect(() => {
    if (!isPending) {
      setShowLoader(true);
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPending]);

  const columnsTable = ['Trainer', 'DNI', 'Phone', 'Email', 'City', 'Salary/Hour'];
  const columnsValue = ['firstName', 'dni', 'phone', 'email', 'city', 'salary'];

  return (
    <section>
      <AddButton entity="Trainer" createMode={createMode} />
      {showLoader ? (
        <Loader />
      ) : (
        <TableComponent
          columnTitleArray={columnsTable}
          data={trainers}
          handleClick={handleClick}
          deleteButton={deleteTrainer}
          columns={columnsValue}
          trainers={trainers}
        />
      )}
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in Database" />
      )}
    </section>
  );
}

export default Trainers;
