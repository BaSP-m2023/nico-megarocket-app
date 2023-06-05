import styles from './trainers.module.css';
import { useEffect, useState } from 'react';
import Table from './TableTrainers';
import Form from './FormTrainers';
import { ToastError } from '../Shared';

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [toastErroOpen, setToastErroOpen] = useState(false);

  const handleToggle = () => {
    setShowForm(!showForm);
    setShowFormEdit(false);
  };

  const getTrainers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/trainer`);
      const data = await response.json();
      setTrainers(data.data);
    } catch (error) {
      setToastErroOpen(true);
    }
  };

  useEffect(() => {
    getTrainers();
  }, []);

  const deleteTrainer = async (id) => {
    try {
      await fetch(process.env.REACT_APP_API_URL + '/trainer/' + id, {
        method: 'DELETE'
      });
      const newTrainers = trainers.filter((trainer) => trainer._id !== id);
      setTrainers(newTrainers);
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = ({ firstName, lastName, dni, phone, email, city, salary, isActive }, _id) => {
    const newItem = {
      _id,
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      salary,
      isActive
    };
    setTrainers([...trainers, newItem]);
  };

  const closeForm = () => {
    setShowForm((current) => !current);
  };

  return (
    <section className={styles.container}>
      <h2>Trainers</h2>

      <button className={styles.button} onClick={handleToggle}>
        <img
          className={styles.add_btn}
          src={`${process.env.PUBLIC_URL}/assets/images/btn-add.png`}
          alt="add icon"
        />
        Add trainer
      </button>
      <Table
        data={trainers}
        deleteTrain={deleteTrainer}
        setTrainers={setTrainers}
        trainers={trainers}
        setShowFormAdd={setShowForm}
        setShowFormEdit={setShowFormEdit}
        showFormEdit={showFormEdit}
      />
      {showForm && <Form addItem={addItem} closeForm={closeForm} />}
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in Database" />
      )}
    </section>
  );
}

export default Trainers;
