import { ToastError, TableComponent, AddButton } from '../Shared';
import { useEffect, useState } from 'react';
import styles from './members.module.css';
import { useHistory } from 'react-router-dom';

function Members() {
  const [members, setMembers] = useState([]);
  const [toastErroOpen, setToastErroOpen] = useState(false);

  const history = useHistory();

  const handleClick = (item) => {
    history.push(`members/form/${item._id}`, { params: { mode: 'edit', ...item } });
  };

  const createMode = () => {
    history.push(`members/form/`, { params: { mode: 'create' } });
  };

  const getMembers = async () => {
    try {
      const reponse = await fetch(`${process.env.REACT_APP_API_URL}/api/member`);
      const data = await reponse.json();
      setMembers(data.data);
    } catch (error) {
      setToastErroOpen(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  const memberDelete = async (memberId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${memberId}`, {
        method: 'DELETE'
      });
      console.log(response);
      setMembers([...members.filter((member) => member._id !== memberId)]);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = ['firstName', 'email', 'phone', 'city', 'postalCode', 'membership'];

  const columnTitleArray = ['Full Name', 'Email', 'Phone', 'City', 'Postal Code', 'Membership'];

  return (
    <section className={styles.container}>
      <div className={styles.titleContainer}>
        <AddButton entity="Member" createMode={createMode} />
      </div>
      {!members.length ? (
        <p>No active Members</p>
      ) : (
        <TableComponent
          columns={columns}
          columnTitleArray={columnTitleArray}
          data={members}
          handleClick={handleClick}
          deleteButton={memberDelete}
          autoDelete={() => {}}
        />
      )}
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in Database" />
      )}
    </section>
  );
}

export default Members;
