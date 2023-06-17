import { useState, useEffect } from 'react';
import { ToastError, AddButton, TableComponent, Loader } from '../Shared';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAdmins, adminDelete } from '../../redux/admins/thunks';

function Admins() {
  const admins = useSelector((state) => state.admins.list);
  const isPending = useSelector((state) => state.admins.pending);
  const isError = useSelector((state) => state.admins.error);
  const dispatch = useDispatch();
  const [toastErroOpen, setToastErroOpen] = useState(isError);

  const history = useHistory();
  const columnTitleArray = ['Admin', 'DNI', 'Phone', 'E-Mail', 'City'];
  const columns = ['firstName', 'dni', 'phone', 'email', 'city'];

  const handleEditClick = (item) => {
    history.push(`/admins/form/${item._id}`, { params: { ...item, mode: 'edit' } });
  };

  const createMode = () => {
    history.push('/admins/form', { params: { mode: 'create' } });
  };

  useEffect(() => {
    getAllAdmins(dispatch);
  }, []);

  useEffect(() => {
    setToastErroOpen(!!isError);
  }, [isError]);

  return (
    <section>
      <div>
        <AddButton entity="Admin" createMode={createMode} />
      </div>
      {isPending ? (
        <Loader />
      ) : (
        <TableComponent
          columnTitleArray={columnTitleArray}
          data={admins}
          handleClick={handleEditClick}
          deleteButton={adminDelete}
          columns={columns}
        />
      )}
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in database" />
      )}
    </section>
  );
}

export default Admins;
