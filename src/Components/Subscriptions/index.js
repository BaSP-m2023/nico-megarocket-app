import styles from './subscriptions.module.css';
import SubscriptionsTable from './Table/Index';

function Subscriptions() {
  return (
    <section className={styles.container}>
      <h2>Subscriptions</h2>
      <SubscriptionsTable />
    </section>
  );
}

export default Subscriptions;
