import React, { useState, useEffect } from 'react';
import { ToastError, AddButton, TableComponent, Loader } from '../Shared';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getClasses, deleteClass } from '../../redux/classes/thunks';

function Projects() {
  const [toastErrorOpen, setToastErrorOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes.list);
  const loading = useSelector((state) => state.classes.pending);
  const error = useSelector((state) => state.classes.error);

  const columnTitleArray = ['Activity', 'Day', 'Hour', 'Trainer', 'Slots'];

  const columns = ['activity', 'day', 'hour', 'trainer', 'slots'];

  const valueField = {
    arrayFirstValue: 'firstName',
    arraySecondValue: 'lastName',
    objectValue: 'name'
  };

  const history = useHistory();

  useEffect(() => {
    getClasses(dispatch);
  }, []);

  useEffect(() => {
    setToastErrorOpen(!!error);
    setToastMessage(error);
  }, [error]);

  const createMode = () => {
    history.push('/classes/ClassForm', { params: { mode: 'create' } });
  };

  const handleClick = (item) => {
    history.push(`/classes/ClassForm/${item._id}`, {
      params: { item: item, mode: 'edit' }
    });
  };

  return (
    <section>
      <AddButton entity={'Class'} createMode={createMode} />{' '}
      {loading ? (
        <Loader />
      ) : (
        <TableComponent
          columnTitleArray={columnTitleArray}
          data={classes}
          handleClick={handleClick}
          deleteButton={deleteClass}
          columns={columns}
          valueField={valueField}
        />
      )}
      {toastErrorOpen && <ToastError setToastErroOpen={setToastErrorOpen} message={toastMessage} />}
    </section>
  );
}

export default Projects;
