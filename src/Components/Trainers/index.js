import styles from './trainers.module.css';
import { useEffect, useState } from 'react';
import Table from './TableTrainers';
import Form from './FormTrainers';

function Trainers() {
  const [trainers, setTrainers] = useState([]);

  const getTrainers = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/trainer`);
    const data = await response.json();
    setTrainers(data.data);
  };

  useEffect(() => {
    getTrainers();
  }, []);

  const addItem = ({ firstName, lastName, dni, phone, email, city, salary, isActive }) => {
    const newItem = {
      id: Math.floor(Math.random() * 1000),
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

  return (
    <section className={styles.container}>
      <h2>Trainers</h2>
      <Table data={trainers} deleteTrain={deleteTrainer} />
      <Form addItem={addItem} />
    </section>
  );
}

export default Trainers;
