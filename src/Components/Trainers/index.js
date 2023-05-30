import styles from './trainers.module.css';
import { useEffect, useState } from 'react';
import Table from './TableTrainers';
import Form from './FormTrainers';

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleToggle = () => {
    setShowForm((current) => !current);
  };

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

  const deleteItem = (id) => {
    setTrainers([...trainers.filter((trainer) => trainer.id !== id)]);
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
        deleteItem={deleteItem}
        setTrainers={setTrainers}
        trainers={trainers}
      />
      {showForm && <Form addItem={addItem} closeForm={closeForm} />}
    </section>
  );
}

export default Trainers;
