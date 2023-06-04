import { useState, useEffect } from 'react';
import TableSubscriptions from './TableSubscription';
import style from './TableSubscriptions.module.css';
import { ToastError } from '../../Shared';

const SubscriptionsTable = () => {
  const [subscription, setSubscription] = useState([]);
  const [toastErroOpen, setToastErroOpen] = useState(false);

  const getSubscriptions = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/subscriptions`);
      const subscriptions = await res.json();
      setSubscription(subscriptions.data);
    } catch (error) {
      setToastErroOpen(true);
      console.error(error);
    }
  };
  useEffect(() => {
    getSubscriptions();
  }, []);
  const deleteSubscriptionDB = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/subscriptions/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  const deleteSubscription = async (id) => {
    await deleteSubscriptionDB(id);
    setSubscription([...subscription.filter((sub) => sub._id !== id)]);
  };
  return (
    <section className={style.containerTable}>
      <TableSubscriptions
        subscription={subscription}
        setSubscription={setSubscription}
        deleteSubscription={deleteSubscription}
      />
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in Database" />
      )}
    </section>
  );
};
export default SubscriptionsTable;
