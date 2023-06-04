import styles from './super-admins.module.css';
import { useEffect, useState } from 'react';
import Table from './Table';
import Form from './Form';
import { ModalSuccess } from '../Shared';
import { ToastError } from '../Shared';

const SuperAdmins = () => {
  const [superAdmins, setSuperAdmins] = useState([]);
  const [superAdminForm, setSuperAdminForm] = useState({
    email: '',
    password: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [showBtnAdd, setShowBtnAdd] = useState(false);
  const [showBtnMod, setShowBtnMod] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [toastErroOpen, setToastErroOpen] = useState(false);

  const getSuperAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}`);
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

  const updateItem = async (updatedItem) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const { _id, __v, ...updatedData } = updatedItem;
      console.log(JSON.stringify(updatedData));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
      if (response.ok) {
        const updatedList = superAdmins.map((item) => {
          if (item._id === updatedItem._id) {
            return updatedItem;
          }
          return item;
        });
        setSuperAdmins(updatedList);
        setSuccessMessage('The Super Admin has been updated successfully.');
        setModalSuccessOpen(true);
      } else {
        console.error('Failed to update item');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleForm = (showBtn) => {
    setShowForm(!showForm);
    if (showBtn) {
      setShowBtnAdd(false);
      setShowBtnMod(true);
    } else {
      setShowBtnAdd(true);
      setShowBtnMod(false);
    }
  };

  return (
    <div className={styles.content}>
      <section className={styles.container}>
        <div>
          {modalSuccessOpen && (
            <ModalSuccess setModalSuccessOpen={setModalSuccessOpen} message={successMessage} />
          )}
        </div>
        <button className={styles.containerBtn} onClick={() => toggleForm(false)}>
          Create Super Admin
        </button>
        <Table
          data={superAdmins}
          deleteItem={deleteItem}
          form={toggleForm}
          setSuperAdminForm={setSuperAdminForm}
        ></Table>
        {showForm && (
          <Form
            addItem={addItem}
            superAdminForm={superAdminForm}
            setSuperAdminForm={setSuperAdminForm}
            showBtnMod={showBtnMod}
            showBtnAdd={showBtnAdd}
            updateItem={updateItem}
          />
        )}
        {toastErroOpen && (
          <ToastError setToastErroOpen={setToastErroOpen} message="Error in Database" />
        )}
      </section>
    </div>
  );
};

export default SuperAdmins;
