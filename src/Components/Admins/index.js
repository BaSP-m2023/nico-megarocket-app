import { useState, useEffect } from 'react';
import styles from './admins.module.css';
import Table from './Table';
import Form from './Form';

function Admins() {
  const [admins, setAdmins] = useState([]);

  const [showForm, setShowform] = useState(false);

  const closeForm = () => {
    setShowform(false);
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const getAdmins = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/admins');
      const data = await response.json();
      setAdmins(data.data);
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
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <Table admins={admins} setShowform={setShowform} />
      {showForm && <Form addAdmin={addAdmin} closedForm={closeForm} />}
    </section>
  );
}

export default Admins;
