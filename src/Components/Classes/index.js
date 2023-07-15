import { useEffect, useState } from 'react';
import { AddButton, TableComponent, Loader } from 'Components/Shared';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getClasses, deleteClass } from 'redux/classes/thunks';
import styles from 'Components/Shared/AddButton/addButton.module.css';

function Classes() {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes.list);
  const isPending = useSelector((state) => state.classes.pending);
  const [showLoader, setShowLoader] = useState(false);

  const columnTitleArray = ['Activity', 'Day', 'Hour', 'Trainer', 'Slots'];

  const columns = ['activity', 'day', 'hour', 'trainer', 'slots'];

  const valueField = {
    arrayFirstValue: 'firstName',
    arraySecondValue: 'lastName',
    objectValue: 'name'
  };

  useEffect(() => {
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

  const history = useHistory();

  const createMode = () => {
    history.push('/admin/classes/ClassForm', { params: { mode: 'create' } });
  };

  const handleClick = (item) => {
    history.push(`/admin/classes/ClassForm/${item._id}`, {
      params: { mode: 'edit' }
    });
  };

  return (
    <section className={styles.containerEachEntityTable}>
      <AddButton entity={'Class'} createMode={createMode} testId="add-class-btn" />{' '}
      {showLoader ? (
        <Loader testId="classes-table-loader" />
      ) : (
        <TableComponent
          columnTitleArray={columnTitleArray}
          data={classes}
          handleClick={handleClick}
          deleteButton={deleteClass}
          columns={columns}
          valueField={valueField}
          testId="classes-table"
        />
      )}
    </section>
  );
}

export default Classes;
