import styles from './super-admins.module.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastError, AddButton, TableComponent } from '../Shared';

const SuperAdmins = () => {
  const [superAdmins, setSuperAdmins] = useState([]);
  /*const [superAdminForm, setSuperAdminForm] = useState({
    email: '',
    password: ''
  });*/
  const [toastErroOpen, setToastErroOpen] = useState(false);

  const getSuperAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admin`);
      const data = await response.json();
      setSuperAdmins(data.data);
    } catch (error) {
      setToastErroOpen(true);
      console.error(error);
    }
  };

  useEffect(() => {
    getSuperAdmins();
  }, []);

  const deleteItem = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/super-admin/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setSuperAdmins([...superAdmins.filter((superAdmin) => superAdmin._id !== id)]);
    } catch (error) {
      console.error(error);
    }
  };

  /*const handleDeleteButtonClick = (id) => {
    deleteItem(id);
  };*/

  const history = useHistory();

  const handleClick = (item) => {
    history.push(`super-admins/form/${item._id}`, { params: { ...item, mode: 'edit' } });
  };

  const createMode = () => {
    history.push('/super-admins/form/', { params: { mode: 'create' } });
  };

  return (
    <div className={styles.content}>
      <section className={styles.container}>
        <AddButton entity={'Super Admin'} createMode={createMode} />
        <div>
          <TableComponent
            columnTitleArray={['Email', 'Password']}
            data={superAdmins}
            handleClick={handleClick}
            deleteButton={deleteItem}
            columns={['email', 'password']}
            autoDelete={() => {}}
          />
          {toastErroOpen && (
            <ToastError setToastErroOpen={setToastErroOpen} message="Error in Database" />
          )}
        </div>
      </section>
    </div>
  );
};

export default SuperAdmins;
