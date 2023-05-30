import styles from './table.module.css';
import React, { useEffect, useState } from 'react';
import Table from './Table';

function Projects() {
  const [classes, setClasses] = useState([]);
  const getClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/class`);
      const data = await response.json();
      setClasses(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getClasses();
  }, []);

  const deleteClassfromDB = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/class/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteClass = async (id) => {
    await deleteClassfromDB(id);
    setClasses({ ...classes.filter((classes) => classes.id !== id) });
  };

  return (
    <section className={styles.container}>
      <Table data={classes} deleteClass={deleteClass} />
    </section>
  );
}

export default Projects;
