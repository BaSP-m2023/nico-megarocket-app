import { ToastError, TableComponent, AddButton, Loader } from '../Shared';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Members() {
  const [members, setMembers] = useState([]);
  const [toastErroOpen, setToastErroOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setToastErroOpen(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  const memberDelete = async (memberId) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/member/${memberId}`, {
        method: 'DELETE'
      });
      setMembers([...members.filter((member) => member._id !== memberId)]);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = ['firstName', 'email', 'phone', 'city', 'postalCode', 'membership'];

  const columnTitleArray = ['Full Name', 'Email', 'Phone', 'City', 'Postal Code', 'Membership'];

  return (
    <section>
      <div>
        <AddButton entity="Member" createMode={createMode} />
      </div>
      {loading ? (
        <Loader />
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
