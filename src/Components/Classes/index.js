import React, { useEffect, useState } from 'react';
import styles from './classes.module.css';
import Table from './Table/index';
import Form from './Form/index';
import ModalsSuccess from '../Modals/ModalSuccess/index';

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

  const getClasses = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/class`);
    const data = await response.json();
    setClasses(data.data);
    console.log(data.data);
  };

  useEffect(() => {
    getClasses();
  }, []);

  const createClass = async (body) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/class`, body);
      const data = await response.json();
      console.log(data);
      console.log(JSON.parse(body.body));
      setClasses([...classes, JSON.parse(body.body)]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateClass = async (id, body) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/class/${id}`, body);
    const data = await response.json();
    console.log(data);
    setClasses([...classes, JSON.parse(body.body)]);
  };

  const showForm = () => {
    setTimeout(() => {
      setShow(!show);
    }, 100);
  };

  const updateModeToggle = () => {
    setUpdateMode(!updateMode);
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

  const deleteClass = (id) => {
    deleteClassfromDB(id);
  };

  const updateClick = (item) => {
    showForm();
    updateModeToggle();
    setClassUpdateId(item._id);
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
          <ModalsSuccess setModalSuccessOpen={setModalSuccessOpen} message={successMessage} />
        )}
      </div>
      <Table updateClick={updateClick} data={classes} deleteClass={deleteClass} />
    </section>
  );
}

export default Projects;
