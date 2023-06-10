import { TableComponent, AddButton } from '../Shared';
import { useEffect, useState } from 'react';
import styles from './members.module.css';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMembers, memberDelete } from '../../redux/members/thunks';
import { ToastError, Loader } from '../Shared';

function Members() {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.list);
  const isPending = useSelector((state) => state.members.pending);
  const isError = useSelector((state) => state.members.error);
  const [setToastErroOpen] = useState(isError);

  const history = useHistory();

  const handleClick = (item) => {
    history.push(`members/form/${item._id}`, { params: { mode: 'edit', ...item } });
  };

  const createMode = () => {
    history.push(`members/form/`, { params: { mode: 'create' } });
  };

  useEffect(() => {
    getAllMembers(dispatch);
  }, []);

  const columns = ['firstName', 'email', 'phone', 'city', 'postalCode', 'membership'];

  const columnTitleArray = ['Full Name', 'Email', 'Phone', 'City', 'Postal Code', 'Membership'];

  return (
    <section className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.letterColour}>Members</h2>
        <AddButton entity="Member" createMode={createMode} />
      </div>
      {isPending && <Loader />}
      {!members.length ? (
        <p>No active Members</p>
      ) : (
        <TableComponent
          columns={columns}
          columnTitleArray={columnTitleArray}
          data={members}
          deleteButton={memberDelete}
          handleClick={handleClick}
          autoDelete={() => {}}
        />
      )}
      {isError ? (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in Database" />
      ) : (
        ''
      )}
    </section>
  );
}

export default Members;
