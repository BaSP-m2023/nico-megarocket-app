import styles from './classes.module.css';
import React, { useEffect, useState } from 'react';
import Table from './Table';
import ModalsSuccess from '../Modals/ModalSuccess';

function Projects() {
  const [classes, setClasses] = useState([]);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const getClasses = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/class`);
      const data = await response.json();
      setClasses(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getClasses();
  }, []);

  const deleteClassfromDB = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/class/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setClasses([...classes.filter((classes) => classes._id !== id)]);
      setSuccessMessage('The class has been deleted successfully.');
      setModalSuccessOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteClass = (id) => {
    deleteClassfromDB(id);
  };

  return (
    <section className={styles.container}>
      <div>
        {modalSuccessOpen && (
          <ModalsSuccess setModalSuccessOpen={setModalSuccessOpen} message={successMessage} />
        )}
      </div>
      <Table data={classes} deleteClass={deleteClass} />
    </section>
  );
}

export default Projects;
