import { useState, useEffect } from 'react';
import styles from './admins.module.css';
import { ToastError, AddButton, TableComponent } from '../Shared';
import { useHistory } from 'react-router-dom';

function Admins() {
  const [admins, setAdmins] = useState([]);

  const [toastErroOpen, setToastErroOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState('Error in database');

  const history = useHistory();
  const columnTitleArray = ['Name', 'Surname', 'DNI', 'Phone', 'E-Mail', 'City'];
  const columns = ['firstName', 'lastName', 'dni', 'phone', 'email', 'city'];

  const getAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
      const data = await response.json();
      setAdmins(data.data);
    } catch (error) {
      setToastErroOpen(true);
    }
  };

  const deleteAdmin = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
        method: 'DELETE'
      });
      const newAdmins = admins.filter((admin) => admin._id !== id);
      setAdmins(newAdmins);
    } catch (error) {
      setToastErroOpen(true);
      setToastMessage(error.message);
    }
  };
  const handleEditClick = (item) => {
    history.push(`/admins/form/${item._id}`, { params: { item, mode: 'edit' } });
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const createMode = () => {
    history.push('/admins/form', { params: { mode: 'create' } });
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <AddButton entity="Admin" createMode={createMode} />
      <TableComponent
        columnTitleArray={columnTitleArray}
        data={admins}
        handleClick={handleEditClick}
        deleteButton={deleteAdmin}
        columns={columns}
      />
      <div className={styles.bottom_container}></div>
      {toastErroOpen && <ToastError setToastErroOpen={setToastErroOpen} message={toastMessage} />}
    </section>
  );
}

export default Admins;
