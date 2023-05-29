import ModalError from '../Modals/ModalError';
import styles from './home.module.css';

function Home() {
  return (
    <section className={styles.container}>
      <h2>Home</h2>
      <ModalError />
    </section>
  );
}

export default Home;
