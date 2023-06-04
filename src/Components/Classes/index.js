import React, { useEffect, useState } from 'react';
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
  const [successMessage, setSuccessMessage] = useState('');
  const [classUpdateId, setClassUpdateId] = useState('');
  const [klass, setKlass] = useState({
    hour: '',
    day: '',
    trainer: '',
    activity: '',
    slots: ''
  });
  const [toastErroOpen, setToastErroOpen] = useState(false);

  const getClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/class`);
      const data = await response.json();
      setClasses(data.data);
    } catch (error) {
      setToastErroOpen(true);
      console.error(error);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  const createClass = async (body) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/class`, body);
      setClasses([...classes, JSON.parse(body.body)]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateClass = async (id, body) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/class/${id}`, body);
      const bodyParsed = JSON.parse(body.body);
      const updatingClass = classes.map((item) => {
        if (item._id === id) {
          item.hour = bodyParsed.hour;
          item.day = bodyParsed.day;
          item.trainer = bodyParsed.trainer;
          item.activity = bodyParsed.activity;
          item.slots = bodyParsed.slots;
          return item;
        }
        return item;
      });
      setClasses(updatingClass);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteClassfromDB = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/class/${id}`, {
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

  const showForm = () => {
    setTimeout(() => {
      setShow(!show);
    }, 0);
  };

  const updateModeToggle = () => {
    setUpdateMode(!updateMode);
  };

  const deleteClass = (id) => {
    deleteClassfromDB(id);
  };

  const updateClick = (item) => {
    showForm();
    updateModeToggle();
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
      <button type="button" className={styles.button} onClick={showForm}>
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
      <Table updateClick={updateClick} data={classes} deleteClass={deleteClass} />
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in Database" />
      )}
    </section>
  );
}

export default Projects;
