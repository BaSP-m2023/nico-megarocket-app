import styles from './super-admins.module.css';
import { useEffect, useState } from 'react';
import Table from './Table';
import ModalsSuccess from '../Modals/ModalSuccess';

const SuperAdmins = () => {
  const [superAdmins, setSuperAdmins] = useState([]);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const getSuperAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}`);
      const data = await response.json();
      setSuperAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSuperAdmins();
  }, []);

  const deleteItem = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
        method: 'DELETE'
      });
      const updatedSuperAdmins = superAdmins.filter((superAdmin) => superAdmin._id !== id);
      setSuperAdmins(updatedSuperAdmins);
      setSuccessMessage('The superadmin has been deleted successfully.');
      setModalSuccessOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.content}>
      <section className={styles.container}>
        <div>
          {modalSuccessOpen && (
            <ModalsSuccess setModalSuccessOpen={setModalSuccessOpen} message={successMessage} />
          )}
        </div>
        <button className={styles.containerBtn}>Create Super Admin</button>
        <Table data={superAdmins} deleteItem={deleteItem}></Table>
      </section>
    </div>
  );
};

export default SuperAdmins;
