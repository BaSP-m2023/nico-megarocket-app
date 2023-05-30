import styles from './super-admins.module.css';
import { useEffect, useState } from 'react';
import Table from './Table';
import Form from './Form';
import ModalsSuccess from '../Modals/ModalSuccess';

const SuperAdmins = () => {
  const [superAdmins, setSuperAdmins] = useState([]);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

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
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setSuperAdmins([...superAdmins.filter((superAdmin) => superAdmin._id !== id)]);
      setSuccessMessage('The superadmin has been deleted successfully.');
      setModalSuccessOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = async ({ email, password }) => {
    try {
      const newSuperAdmin = {
        email,
        password
      };
      const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSuperAdmin)
      });
      if (response.ok) {
        setSuperAdmins([...superAdmins, newSuperAdmin]);
      } else {
        console.error('Failed to add super admin');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className={styles.content}>
      <section className={styles.container}>
        <div>
          {modalSuccessOpen && (
            <ModalsSuccess setModalSuccessOpen={setModalSuccessOpen} message={successMessage} />
          )}
        </div>
        <button className={styles.containerBtn} onClick={toggleForm}>
          Create Super Admin
        </button>
        <Table data={superAdmins} deleteItem={deleteItem} form={toggleForm}></Table>
        {showForm && <Form addItem={addItem} />}
      </section>
    </div>
  );
};

export default SuperAdmins;
