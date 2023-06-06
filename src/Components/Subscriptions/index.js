import styles from './subscriptions.module.css';
import { useEffect, useState } from 'react';
import { AddButton, TableComponent, ToastError } from '../Shared';
import { useHistory } from 'react-router-dom';

function Subscriptions() {
  const [subscription, serSubscription] = useState([]);
  const [toastErroOpen, setToastErroOpen] = useState(false);

  const history = useHistory();

  const getSuscription = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/subscription`);
      const data = await response.json();
      serSubscription(data.data);
    } catch (error) {
      setToastErroOpen(true);
    }
  };
  useEffect(() => {
    getSuscription();
  }, []);

  const createMode = () => {
    history.push('subscriptions/form/', { params: { mode: 'created' } });
  };

  const handleClick = (item) => {
    history.push(`subscriptions/form/${item._id}`, { params: { ...item, mode: 'edit' } });
  };

  const deleteSubscription = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/subscription/${id}`, {
        method: 'DELETE'
      });
      const newSubscription = subscription.filter((subs) => subs._id !== id);
      serSubscription(newSubscription);
    } catch (error) {
      console.log(error);
    }
  };

  const columnTitleArray = ['Classes', 'Members', 'Date'];
  const columns = ['classId', 'members', 'date'];
  const valueField = {
    arrayFirstValue: 'firstName',
    arraySecondValue: 'lastName',
    objectValue: '_id'
  };

  return (
    <section className={styles.container}>
      <h2>Subscriptions</h2>
      <AddButton entity="Suscription" createMode={createMode} />
      <TableComponent
        columnTitleArray={columnTitleArray}
        data={subscription}
        handleClick={handleClick}
        deleteButton={deleteSubscription}
        valueField={valueField}
        // arrayAndObject={arrayAndObject}
        columns={columns}
      />
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in Database" />
      )}
    </section>
  );
}

export default Subscriptions;
