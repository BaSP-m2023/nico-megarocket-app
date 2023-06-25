import React, { useEffect } from 'react';
import { AddButton, TableComponent, Loader } from 'Components/Shared';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getClasses, deleteClass } from 'redux/classes/thunks';

function Classes() {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes.list);
  const loading = useSelector((state) => state.classes.pending);

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

  const createMode = () => {
    history.push('/admin/classes/ClassForm', { params: { mode: 'create' } });
  };

  const handleClick = (item) => {
    history.push(`/admin/classes/ClassForm/${item._id}`, {
      params: { mode: 'edit' }
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
    </section>
  );
}

export default Classes;
