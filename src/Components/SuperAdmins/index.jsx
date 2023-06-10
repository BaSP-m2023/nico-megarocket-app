import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastError, AddButton, TableComponent, Loader } from '../Shared';
import { getSuperAdmins } from '../../redux/superAdmins/thunks';
import { useSelector, useDispatch } from 'react-redux';

const SuperAdmins = () => {
  const [superAdmins, setSuperAdmins] = useState([]);

  const [toastErrorOpen, setToastErrorOpen] = useState(false);

  const history = useHistory();

  const dispatch = useDispatch();

  const superAdminState = useSelector((state) => state.superAdmin);
  const superadmins = useSelector((state) => state.superAdmin.list);

  useEffect(() => {
    getSuperAdmins(dispatch);
  }, []);

  useEffect(() => {
    setToastErrorOpen(!!superAdminState.error);
  }, [superAdminState.error]);

  const deleteItem = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/super-admin/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setSuperAdmins([...superAdmins.filter((superAdmin) => superAdmin._id !== id)]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (item) => {
    history.push(`super-admins/form/${item._id}`, { params: { ...item, mode: 'edit' } });
  };
  const createMode = () => {
    history.push('/super-admins/form/', { params: { mode: 'create' } });
  };

  return (
    <div>
      <section>
        <AddButton entity={'Super Admin'} createMode={createMode} />
        <div>
          {superAdminState.loading ? (
            <Loader />
          ) : (
            <TableComponent
              columnTitleArray={['Email', 'Password']}
              data={superadmins}
              handleClick={handleClick}
              deleteButton={deleteItem}
              columns={['email', 'password']}
              autoDelete={() => {}}
            />
          )}
          {toastErrorOpen && (
            <ToastError setToastErroOpen={setToastErrorOpen} message="Error in Database" />
          )}
        </div>
      </section>
    </div>
  );
};

export default SuperAdmins;
