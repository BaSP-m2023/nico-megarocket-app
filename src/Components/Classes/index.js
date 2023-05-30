import React, { useEffect, useState } from 'react';
import styles from './classes.module.css';
import Form from './Form/index';

function Projects() {
  const [show, setShow] = useState(false);
  const [classes, setClasses] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);

  const getClasses = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/class`);
    const data = await response.json();
    setClasses(data);
  };

  useEffect(() => {
    getClasses();
  }, []);

  const createClass = async (body) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/class`, body);
    const data = await response.json();
    console.log(data);
  };

  const updateClass = async (id, body) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/class/${id}`, body);
    const data = await response.json();
    console.log(data);
  };

  const showForm = () => {
    setTimeout(() => {
      setShow(!show);
    }, 100);
  };

  const updateModeToggle = () => {
    setUpdateMode(!updateMode);
  };

  const addClass = (hour, day, trainer, activity, slots) => {
    const newClass = {
      hour,
      day,
      trainer,
      activity,
      slots
    };
    setClasses([...classes, newClass]);
  };

  return (
    <section className={styles.container}>
      <h2>Classes</h2>
      <button type="button" className={styles.button} onClick={showForm}>
        <img src={`${process.env.PUBLIC_URL}/assets/images/btn-add.png`} /> Add
      </button>
      <button
        type="button"
        className={styles.button}
        onClick={() => {
          showForm();
          updateModeToggle();
        }}
      >
        Edit
      </button>
      {show && (
        <Form
          createCLass={createClass}
          updateClass={updateClass}
          addItem={addClass}
          updateToggle={{ updateMode, setUpdateMode }}
          show={showForm}
        />
      )}
    </section>
  );
}

export default Projects;
