import { useEffect, useState } from 'react';
import { AddButton, Loader, TableComponent, ToastError } from '../Shared';
import { useHistory } from 'react-router-dom';

function Subscriptions() {
  const [subscription, setSubscription] = useState([]);
  const [toastErroOpen, setToastErroOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const getSuscription = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription`);
      const data = await response.json();
      setSubscription(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
      await fetch(`${process.env.REACT_APP_API_URL}/api/subscription/${id}`, {
        method: 'DELETE'
      });
      const newSubscription = subscription.filter((subs) => subs._id !== id);
      setSubscription(newSubscription);
    } catch (error) {
      console.log(error);
    }
  };

  const autoDelete = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/subscription/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setSubscription([...subscription.filter((subs) => subs._id !== id)]);
      setToastMessage(
        'One or more classes were deleted from the table. Why?: The Member or Class were deleted from DB'
      );
      setToastErroOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const columnTitleArray = ['Classes', 'Members', 'Date'];
  const columns = ['classId', 'members', 'date'];
  const valueField = {
    arrayFirstValue: 'firstName',
    arraySecondValue: 'lastName',
    objectValue: '_id'
  };
  const arrayAndObject = {
    array: 'members',
    object: 'classId'
  };
  return (
    <section>
      <AddButton entity="Suscription" createMode={createMode} />
      {loading ? (
        <Loader />
      ) : (
        <TableComponent
          columnTitleArray={columnTitleArray}
          data={subscription}
          handleClick={handleClick}
          deleteButton={deleteSubscription}
          valueField={valueField}
          arrayAndObject={arrayAndObject}
          columns={columns}
          autoDelete={autoDelete}
        />
      )}
      {toastErroOpen && <ToastError setToastErroOpen={setToastErroOpen} message={toastMessage} />}
    </section>
  );
}

export default Subscriptions;
