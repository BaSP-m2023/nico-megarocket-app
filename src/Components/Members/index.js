import { TableComponent, AddButton, ToastError, Loader } from 'Components/Shared';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMembers, memberDelete } from 'redux/members/thunks';

function Members() {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.list);
  const isPending = useSelector((state) => state.members.pending);
  const isError = useSelector((state) => state.members.error);
  const [toastError, setToastErroOpen] = useState(isError);

  const history = useHistory();

  const handleClick = (item) => {
    history.push(`/admin/members/form/${item._id}`, { params: { mode: 'edit', ...item } });
  };

  const createMode = () => {
    history.push(`/admin/members/form/`, { params: { mode: 'create' } });
  };

  useEffect(() => {
    getAllMembers(dispatch);
  }, []);

  useEffect(() => {
    setToastErroOpen(!!isError);
  }, [isError]);

  const columns = ['firstName', 'email', 'phone', 'city', 'postalCode', 'membership'];

  const columnTitleArray = ['Full Name', 'Email', 'Phone', 'City', 'Postal Code', 'Membership'];

  return (
    <section>
      <div>
        <AddButton entity="Member" createMode={createMode} />
      </div>
      {isPending && <Loader />}
      {!isPending && (
        <TableComponent
          columns={columns}
          columnTitleArray={columnTitleArray}
          data={members}
          deleteButton={memberDelete}
          handleClick={handleClick}
        />
      )}
      {toastError && <ToastError setToastErroOpen={setToastErroOpen} message="Error in Database" />}
    </section>
  );
}

export default Members;
