import { useState, useEffect } from 'react';
import { ToastError, AddButton, TableComponent, Loader } from 'Components/Shared';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAdmins, adminDelete } from 'redux/admins/thunks';

function Admins() {
  const admins = useSelector((state) => state.admins.list);
  const isPending = useSelector((state) => state.admins.pending);
  const isError = useSelector((state) => state.admins.error);
  const dispatch = useDispatch();
  const [toastErroOpen, setToastErroOpen] = useState(isError);
  const [showLoader, setShowLoader] = useState(false);

  const history = useHistory();
  const columnTitleArray = ['Admin', 'DNI', 'Phone', 'E-Mail', 'City'];
  const columns = ['firstName', 'dni', 'phone', 'email', 'city'];

  const handleEditClick = (item) => {
    history.push(`/superAdmin/admin/form/${item._id}`, { params: { ...item, mode: 'edit' } });
  };

  const createMode = () => {
    history.push('/superAdmin/admin/form/', { params: { mode: 'create' } });
  };

  useEffect(() => {
    getAllAdmins(dispatch);
  }, []);

  useEffect(() => {
    setToastErroOpen(!!isError);
  }, [isError]);

  useEffect(() => {
    if (!isPending) {
      setShowLoader(true);
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPending]);

  return (
    <section>
      <div>
        <AddButton entity="Admin" createMode={createMode} testId="add-admin-btn" />
      </div>
      {showLoader ? (
        <Loader testId="admin-table-loader" />
      ) : (
        <TableComponent
          columnTitleArray={columnTitleArray}
          data={admins}
          handleClick={handleEditClick}
          deleteButton={adminDelete}
          columns={columns}
          testId="admin-table"
        />
      )}
      {toastErroOpen && (
        <ToastError
          setToastErroOpen={setToastErroOpen}
          message="Error in database"
          testId="admin-list-toast-error"
        />
      )}
    </section>
  );
}

export default Admins;
