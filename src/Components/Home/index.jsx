import styles from './home.module.css';
import { Inputs } from '../Shared';
import { OptionInput } from '../Shared';

function Home() {
  const options = ['option 1', 'option 2', 'option 3', 'yhanahi'];
  return (
    <section className={styles.container}>
      <h2>Home</h2>
      <div className={styles.InputContainer}>
        <Inputs text={'Normal'} />
        <Inputs text={'Disabled'} disabled />
        <OptionInput dataOptions={options} />
      </div>
    </section>
  );
}

export default Home;
