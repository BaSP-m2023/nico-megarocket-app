import styles from './super-admins.module.css';
import { useEffect, useState } from 'react';
import Table from './Table';

const SuperAdmins = () => {
  const [superAdmins, setSuperAdmins] = useState([]);

  const getSuperAdmins = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`);
    const data = await response.json();
    setSuperAdmins(data.data);
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.content}>
      <section className={styles.container}>
        <button className={styles.containerBtn}>Add</button>
        <Table data={superAdmins} deleteItem={deleteItem}></Table>
      </section>
    </div>
  );
};

export default SuperAdmins;
