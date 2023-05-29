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

  return (
    <section className={styles.container}>
      <Table data={superAdmins}></Table>
    </section>
  );
};

export default SuperAdmins;
