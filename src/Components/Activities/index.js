import styles from './activities.module.css';
import ActivitiesTable from './Table/Index';

function Activities() {
  return (
    <section className={styles.container}>
      <h2>Activities</h2>
      <ActivitiesTable />
    </section>
  );
}

export default Activities;
