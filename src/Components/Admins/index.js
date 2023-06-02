import { useState, useEffect } from 'react';
import styles from './admins.module.css';
import Table from './Table';
import Form from './Form';
import ModalSuccess from '../Modals/ModalSuccess';

function Admins() {
  const [admins, setAdmins] = useState([]);

  const [showForm, setShowform] = useState(false);

  const [adminToEditId, setAdminToEditId] = useState('');

  const [editMode, setEditMode] = useState(false);

  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);

  const [adminEdited, setAdminEdited] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    dni: '',
    password: ''
  });

  const closeForm = () => {
    setShowform(false);
  };

  const getAdmins = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/admins');
      const data = await response.json();
      setAdmins(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAdmin = async (id) => {
    try {
      await fetch(process.env.REACT_APP_API_URL + '/admins/' + id, {
        method: 'DELETE'
      });
      const newAdmins = admins.filter((admin) => admin._id !== id);
      setAdmins(newAdmins);
    } catch (error) {
      console.log(error);
    }
  };
  const addAdmin = ({ firstName, lastName, phone, email, city, dni, password }) => {
    const newAdmin = {
      firstName,
      lastName,
      phone,
      email,
      city,
      dni,
      password
    };
    setAdmins([...admins, newAdmin]);
    setModalSuccessOpen(true);
  };

  const editAdmins = async (id, bodyEdited) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyEdited)
      });
      const updateAdmins = [...admins];
      const index = updateAdmins.findIndex((admin) => admin._id === id);
      if (index !== -1) {
        updateAdmins[index] = bodyEdited;
        setAdmins(updateAdmins);
        setModalSuccessOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const adminEditedId = (id) => {
    const findAdmin = admins.find((i) => i._id === id);
    setAdminEdited({
      firstName: findAdmin.firstName,
      lastName: findAdmin.lastName,
      phone: findAdmin.phone,
      email: findAdmin.email,
      city: findAdmin.city,
      dni: findAdmin.dni,
      password: findAdmin.password
    });
    setAdminToEditId(findAdmin._id);
  };

  const finalEdit = (id) => {
    const findId = admins.find((i) => i._id === id);
    editAdmins(findId._id, adminEdited);
    adminEditedId(id);
  };

  useEffect(() => {
    getAdmins();
  }, []);

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <Table
        setAdminToEditId={setAdminToEditId}
        admins={admins}
        setShowform={setShowform}
        setEditMode={setEditMode}
        adminEditedId={adminEditedId}
        deleteAdm={deleteAdmin}
      />
      {showForm && (
        <Form
          addAdmin={addAdmin}
          closedForm={closeForm}
          adminToEditId={adminToEditId}
          admins={admins}
          editMode={editMode}
          adminEdited={adminEdited}
          setAdminEdited={setAdminEdited}
          finalEdit={finalEdit}
        />
      )}
      {modalSuccessOpen && (
        <ModalSuccess
          message={editMode ? 'Admin edited successfully' : 'Admin created successfully'}
          setModalSuccessOpen={setModalSuccessOpen}
        />
      )}
    </section>
  );
}

export default Admins;
