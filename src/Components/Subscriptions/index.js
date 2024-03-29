import { useEffect, useState } from 'react';
import { Loader, TableComponent, ToastError, AddButton } from 'Components/Shared';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSuscription, deleteSubscription } from 'redux/subscriptions/thunks';
import { getClasses } from 'redux/classes/thunks';
import styles from 'Components/Shared/AddButton/addButton.module.css';

function Subscriptions() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isPending = useSelector((state) => state.subscription.pending);
  const subscription = useSelector((state) => state.subscription.data);
  const classes = useSelector((state) => state.classes.list);
  const error = useSelector((state) => state.subscription.error);
  const [toastError, setToastErroOpen] = useState(error);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    for (const subs of subscription) {
      if (subs.classId === null) {
        dispatch(deleteSubscription(subs._id));
      }
    }
  }, [subscription, dispatch]);
  useEffect(() => {
    getSuscription(dispatch);
    getClasses(dispatch);
  }, []);

  useEffect(() => {
    if (!isPending) {
      setShowLoader(true);
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPending]);

  const handleClick = (item) => {
    history.push(`/admin/subscriptions/form/${item._id}`, { params: { ...item, mode: 'edit' } });
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
    <section className={styles.containerEachEntityTable}>
      <AddButton visibles={styles.visibles} />
      {showLoader ? (
        <Loader />
      ) : (
        <TableComponent
          columnTitleArray={columnTitleArray}
          data={subscription}
          handleClick={handleClick}
          deleteButton={deleteSubscription}
          valueField={valueField}
          columns={columns}
          classes={classes}
        />
      )}
      {toastError && <ToastError setToastErroOpen={setToastErroOpen} message="Error in Database" />}
    </section>
  );
}

export default Subscriptions;
