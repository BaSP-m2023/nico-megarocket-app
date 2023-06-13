import { useEffect, useState } from 'react';
import { AddButton, Loader, TableComponent, ToastError } from '../Shared';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSuscription, deleteSubscription } from '../../redux/subscriptions/thunks';

function Subscriptions() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.subscription.pending);
  const subscription = useSelector((state) => state.subscription.data);
  const error = useSelector((state) => state.subscription.error);
  const [toastError, setToastErroOpen] = useState(error);

  useEffect(() => {
    getSuscription(dispatch);
  }, []);

  const createMode = () => {
    history.push('subscriptions/form/', { params: { mode: 'created' } });
  };

  const handleClick = (item) => {
    history.push(`subscriptions/form/${item._id}`, { params: { ...item, mode: 'edit' } });
  };

  useEffect(() => {
    setToastErroOpen(!!error);
  }, [error]);

  const columnTitleArray = ['Classes', 'Members', 'Date'];
  const columns = ['classId', 'members', 'date'];
  const valueField = {
    arrayFirstValue: 'firstName',
    arraySecondValue: 'lastName',
    objectValue: '_id'
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
          columns={columns}
        />
      )}
      {toastError && <ToastError setToastErroOpen={setToastErroOpen} message="Error in Database" />}
    </section>
  );
}

export default Subscriptions;
