import styles from './home.module.css';
import { Inputs } from '../Shared';
import { OptionInput } from '../Shared';
import { useState } from 'react';

function Home() {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const mainInput = 'name';
  const [active, setActive] = useState(false);
  const [editActivity, setEditActivities] = useState({ name: '' });
  const changeInputEdit = (e) => {
    setEditActivities({
      ...editActivity,
      [e.target.name]: e.target.value
    });

    if (e.target.value.length >= 10) {
      setActive(true);
    } else {
      setActive(false);
    }
  };
  return (
    <section className={styles.container}>
      <h2>Home</h2>
      <div className={styles.InputContainer}>
        <Inputs
          change={changeInputEdit}
          nameInput={mainInput}
          text={editActivity.name}
          isDisabled={active}
          nameTitle="Name"
        />
        <OptionInput dataOptions={options} />
      </div>
    </section>
  );
}

export default Home;
