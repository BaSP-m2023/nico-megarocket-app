import { useEffect, useState } from 'react';
import { AddButton, Loader, TableComponent, ToastError } from '../Shared';
import { useHistory } from 'react-router-dom';

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [toastErroOpen, setToastErroOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const getTrainers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`);
      const data = await response.json();
      setTrainers(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setToastErroOpen(true);
    }
  };

  useEffect(() => {
    getTrainers();
  }, []);

  const createMode = () => {
    history.push('trainers/form/', { params: { mode: 'created' } });
  };

  const handleClick = (item) => {
    history.push(`trainers/form/${item._id}`, { params: { ...item, mode: 'edit' } });
  };

  const deleteTrainer = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`, {
        method: 'DELETE'
      });
      const newTrainers = trainers.filter((trainer) => trainer._id !== id);
      setTrainers(newTrainers);
    } catch (error) {
      console.log(error);
    }
  };

  const columnsTable = ['Trainer', 'DNI', 'Phone', 'Email', 'City', 'Salary/Hour'];
  const columnsValue = ['firstName', 'dni', 'phone', 'email', 'city', 'salary'];

  return (
    <section>
      <AddButton entity="Trainer" createMode={createMode} />
      {loading ? (
        <Loader />
      ) : (
        <TableComponent
          columnTitleArray={columnsTable}
          data={trainers}
          handleClick={handleClick}
          deleteButton={deleteTrainer}
          columns={columnsValue}
          autoDelete={() => {}}
        />
      )}
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in Database" />
      )}
    </section>
  );
}

export default Trainers;
