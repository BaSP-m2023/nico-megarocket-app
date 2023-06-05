import React, { useState, useEffect } from 'react';
import styles from './classes.module.css';
import Table from './Table/index';
import Form from './Form/index';
import { ModalSuccess } from '../Shared';
import { ToastError } from '../Shared';

function Projects() {
  const [show, setShow] = useState(false);
  const [classes, setClasses] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [toastErroOpen, setToastErroOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [classUpdateId, setClassUpdateId] = useState('');
  const [klass, setKlass] = useState({
    hour: '',
    day: '',
    trainer: '',
    activity: '',
    slots: ''
  });

  const getClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class`);
      const data = await response.json();
      setClasses(data.data);
    } catch (error) {
      setToastMessage('Error in Database');
      setToastErroOpen(true);
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

  const deleteClassfromDB = async (id) => {
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
      setToastMessage('The Activity or Trainer does not exist');
      setToastErroOpen(true);
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
    deleteClassfromDB(id);
  };

  const updateClick = (item) => {
    showForm();
    setUpdateMode(true);
    setClassUpdateId(item._id);
    setKlass({
      hour: item.hour,
      day: item.day,
      trainer: item.trainer.map((item) => item._id),
      activity: item.activity._id,
      slots: item.slots
    });
  };

  return (
    <section className={styles.container}>
      <h2>Classes</h2>
      <button type="button" className={styles.button} onClick={createMode}>
        <img src={`${process.env.PUBLIC_URL}/assets/images/btn-add.png`} /> Add
      </button>
      {show && (
        <Form
          klass={{ klass, setKlass }}
          classes={classes}
          classUpdateId={classUpdateId}
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
      <Table
        classes={{ classes, setClasses }}
        updateClick={updateClick}
        data={classes}
        deleteClass={deleteClass}
        autoDelete={autoDelete}
      />
      {toastErroOpen && <ToastError setToastErroOpen={setToastErroOpen} message={toastMessage} />}
    </section>
  );
}

export default Projects;
