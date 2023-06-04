import styles from './home.module.css';
import { Button } from '../Shared';

function Home() {
  return (
    <section className={styles.container}>
      <h2>Home</h2>
      <Button clickAction={() => console.log('hola')} text="Add" />
    </section>
  );
}

export default Home;
