import { useState, useEffect } from 'react';
import styles from './admins.module.css';
import Table from './Table';
// import Form from './Form';
import { ModalSuccess, ToastError, AddButton } from '../Shared';
import { useHistory } from 'react-router-dom';

function Admins() {
  const [admins, setAdmins] = useState([]);

  // const [showForm, setShowform] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);

  const [toastErroOpen, setToastErroOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState('Error in database');

  const history = useHistory();

  const getAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
      const data = await response.json();
      setAdmins(data.data);
    } catch (error) {
      setToastErroOpen(true);
      console.log(error);
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
      <Table
        // setAdminToEditId={setAdminToEditId}
        admins={admins}
        // setShowform={setShowform}
        setEditMode={setEditMode}
        // adminEditedId={adminEditedId}
        deleteAdm={deleteAdmin}
      />

      {modalSuccessOpen && (
        <ModalSuccess
          message={editMode ? 'Admin edited successfully' : 'Admin created successfully'}
          setModalSuccessOpen={setModalSuccessOpen}
        />
      )}
      {toastErroOpen && <ToastError setToastErroOpen={setToastErroOpen} message={toastMessage} />}
    </section>
  );
}

export default Admins;
