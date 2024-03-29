import { TableComponent, ToastError, Loader, AddButton } from 'Components/Shared';
import styles from 'Components/Shared/AddButton/addButton.module.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMembers, memberDelete } from 'redux/members/thunks';

function Members() {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.list);
  const isError = useSelector((state) => state.members.error);
  const isPending = useSelector((state) => state.members.pending);
  const [toastError, setToastErroOpen] = useState(isError);
  const [showLoader, setShowLoader] = useState(false);
  const history = useHistory();
  const handleClick = (item) => {
    history.push(`/admin/members/form/${item._id}`, { params: { mode: 'edit', ...item } });
  };

  useEffect(() => {
    getAllMembers(dispatch);
  }, []);

  useEffect(() => {
    if (!location.pathname === '/api/auth/') {
      if (isError.error) {
        setToastErroOpen(true);
      } else {
        setToastErroOpen(false);
      }
    }
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

  const columns = ['firstName', 'email', 'phone', 'city', 'postalCode', 'membership'];

  const columnTitleArray = ['Full Name', 'Email', 'Phone', 'City', 'Postal Code', 'Membership'];

  return (
    <section className={styles.containerEachEntityTable}>
      <AddButton visibles={styles.visibles} />
      {showLoader ? (
        <Loader />
      ) : (
        <TableComponent
          columns={columns}
          columnTitleArray={columnTitleArray}
          data={members}
          deleteButton={memberDelete}
          handleClick={handleClick}
          testId="members-table"
        />
      )}
      {toastError && (
        <ToastError
          setToastErroOpen={setToastErroOpen}
          message="Error in Database"
          testId="member-list-toast-error"
        />
      )}
    </section>
  );
}

export default Members;
