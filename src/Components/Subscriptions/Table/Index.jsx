import { useState, useEffect } from 'react';
import TableSubscriptions from './Index';

const SubscriptionsTable = () => {
  const [subscription, setSubscription] = useState([]);

  const getSubscriptions = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/subscriptions`);
      const subscriptions = await res.json();
      setSubscription(subscriptions.data);
    } catch (error) {
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
    <section>
      {!subscription.length ? (
        <p>No active Members</p>
      ) : (
        <TableSubscriptions subscription={subscription} deleteSubscription={deleteSubscription} />
      )}
    </section>
  );
};

export default SubscriptionsTable;
