import React, { useState, useEffect } from 'react';
import styles from './classes.module.css';
import FormClasses from './Form/index';
import { ModalSuccess, TableComponent } from '../Shared';
import { ToastError } from '../Shared';
import { useHistory } from 'react-router-dom';

function Projects() {
  const [show, setShow] = useState(false);
  const [classes, setClasses] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [toastErrorOpen, setToastErrorOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [klass, setKlass] = useState({
    hour: '',
    day: '',
    trainer: '',
    activity: '',
    slots: ''
  });

  const columnTitleArray = ['Activity', 'Day', 'Hour', 'Trainer', 'Slots'];

  const columns = ['activity', 'day', 'hour', 'trainer', 'slots'];

  const arrayAndObject = {
    array: 'trainers',
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

  const createClass = async (body) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/class`, body);
      setSuccessMessage('The class has been created successfully.');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  const updateClass = async (id, body) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`, body);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteClassFromDB = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`, {
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

  const showForm = () => {
    setTimeout(() => {
      setShow(!show);
    }, 0);
  };

  const createMode = () => {
    showForm();
    {
      updateMode && setUpdateMode(false);
    }
    setKlass({
      hour: '',
      day: '',
      trainer: '',
      activity: '',
      slots: ''
    });
  };

  const deleteClass = (id) => {
    deleteClassFromDB(id);
  };

  const handleClick = (item) => {
    history.push(`/classes/AdminForm/${item._id}`, { params: { item: item, mode: 'edit' } });
    // showForm();
    // setUpdateMode(true);
    // setClassUpdateId(item._id);
    // setKlass({
    //   hour: item.hour,
    //   day: item.day,
    //   trainer: item.trainer.map((item) => item._id),
    //   activity: item.activity._id,
    //   slots: item.slots
    // });
  };

  return (
    <section className={styles.container}>
      <h2>Classes</h2>
      <button type="button" className={styles.button} onClick={createMode}>
        <img src={`${process.env.PUBLIC_URL}/assets/images/btn-add.png`} /> Add
      </button>
      {show && (
        <FormClasses
          klass={{ klass, setKlass }}
          classes={classes}
          createCLass={createClass}
          updateClass={updateClass}
          updateToggle={{ updateMode, setUpdateMode }}
          show={showForm}
        />
      )}
      <div>
        {modalSuccessOpen && (
          <ModalSuccess setModalSuccessOpen={setModalSuccessOpen} message={successMessage} />
        )}
      </div>
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
