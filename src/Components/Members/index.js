import { useEffect, useState } from 'react';
import styles from './members.module.css';
import { Form } from './Form/MembersForm';
import { MembersEditForm } from './EditForm/MembersEditForm';

function Members() {
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    birthday: '',
    phone: '',
    email: '',
    city: '',
    postalCode: '',
    isActive: false,
    membership: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setEditForm] = useState(false);

  const getMembers = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/member');
      const data = await response.json();
      setMembers(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMembers();
  }, []);

  const handleToggle = () => {
    setShowForm((current) => !current);
    setEditForm(false);
  };

  const handleEditToggle = () => {
    setEditForm((current) => !current);
    setShowForm(false);
  };

  const updateMember = async (id, memberUpdated) => {
    let memberToUpdateIndex = members.findIndex((member) => member.id === id);
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + `/member/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(memberUpdated)
      });

      const { error, data } = await response.json();
      if (!error) {
        const currentsMembers = [...members];
        currentsMembers[memberToUpdateIndex] = data;
        setMembers(currentsMembers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Members</h2>
      <button className={styles.button} onClick={handleToggle}>
        Add
      </button>
      <button className={styles.button} onClick={handleEditToggle}>
        Edit
      </button>
      {showEditForm && <MembersEditForm member={member} updateMember={updateMember} />}
      {showForm && <Form member={member} setMember={setMember} setMembers={setMembers} />}
    </section>
  );
}

export default Members;
