import { useState } from 'react';
import styles from './classes.module.css';
import Form from './Form/index';

function Projects() {
  const [show, setShow] = useState(false);
  const [classes, setClasses] = useState([]);

  const showForm = () => {
    setTimeout(() => {
      setShow(!show);
    }, 100);
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
      <button className={styles.button} onClick={showForm}>
        <img src={`${process.env.PUBLIC_URL}/assets/images/btn-add.png`} /> Add
      </button>
      {show ? <Form addItem={addClass} show={showForm} /> : ''}
    </section>
  );
}

export default Projects;
