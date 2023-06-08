import React, { useState, useEffect } from 'react';
import styles from './classes.module.css';
import { TableComponent, ToastError } from '../Shared';
import { useHistory } from 'react-router-dom';
import AddButton from './../Shared/AddButton/index';

function Projects() {
  const [classes, setClasses] = useState([]);
  const [toastErrorOpen, setToastErrorOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const columnTitleArray = ['Activity', 'Day', 'Hour', 'Trainer', 'Slots'];

  const columns = ['activity', 'day', 'hour', 'trainer', 'slots'];

  const arrayAndObject = {
    array: 'trainer',
    object: 'activity'
  };

  const valueField = {
    arrayFirstValue: 'firstName',
    arraySecondValue: 'lastName',
    objectValue: 'name'
  };

  const history = useHistory();

  const getClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class`);
      const data = await response.json();
      setClasses(data.data);
    } catch (error) {
      setToastMessage('Error in Database');
      setToastErrorOpen(true);
      console.error(error);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  const deleteClassFromDB = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setClasses([...classes.filter((classes) => classes._id !== id)]);
    } catch (error) {
      console.error(error);
    }
  };

  const autoDelete = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setClasses([...classes.filter((classes) => classes._id !== id)]);
      setToastMessage(
        'One or more classes were deleted from the table. Why?: The Trainer or Activity were deleted from DB'
      );
      setToastErrorOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const createMode = () => {
    history.push('/classes/ClassForm', { params: { mode: 'create' } });
  };

  const deleteClass = (id) => {
    deleteClassFromDB(id);
  };

  const handleClick = (item) => {
    history.push(`/classes/ClassForm/${item._id}`, {
      params: { item: item, mode: 'edit' }
    });
  };

  return (
    <section className={styles.container}>
      <AddButton entity={'Class'} createMode={createMode} />{' '}
      <TableComponent
        columnTitleArray={columnTitleArray}
        data={classes}
        handleClick={handleClick}
        deleteButton={deleteClass}
        columns={columns}
        valueField={valueField}
        arrayAndObject={arrayAndObject}
        autoDelete={autoDelete}
      />
      {toastErrorOpen && <ToastError setToastErroOpen={setToastErrorOpen} message={toastMessage} />}
    </section>
  );
}

export default Projects;
