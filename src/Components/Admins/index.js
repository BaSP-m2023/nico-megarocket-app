import { useState, useEffect } from 'react';
import styles from './admins.module.css';
import Table from './Table';

function Admins() {
  const [admins, setAdmins] = useState([]);

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

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <Table admins={admins} />
    </section>
  );
}

export default Admins;
