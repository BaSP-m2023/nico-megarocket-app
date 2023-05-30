import { useEffect, useState } from 'react';
import styles from './members.module.css';
import TableMember from './TableMember';

function Members() {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setEditForm] = useState(false);

  const getMembers = async () => {
    try {
      const reponse = await fetch(`${process.env.REACT_APP_API_URL}/member`);
      const data = await reponse.json();
      setMembers(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMembers();
  }, []);

  const updateMember = async (id, memberUpdated) => {
    let memberToUpdateIndex = members.findIndex((member) => member._id === id);
    console.log(id);
    console.log(memberUpdated);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/member/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(memberUpdated)
      });

      const { error } = await response.json();
      if (!error) {
        const currentsMembers = [...members];
        currentsMembers[memberToUpdateIndex] = memberUpdated;
        setMembers(currentsMembers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const memberDelete = async (memberId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/member/${memberId}`, {
        method: 'DELETE'
      });
      console.log(response);
      setMembers([...members.filter((member) => member._id !== memberId)]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = () => {
    setShowForm((current) => !current);
    setEditForm(false);
  };

  const handleEditToggle = () => {
    setEditForm((current) => !current);
    setShowForm(false);
  };

  return (
    <section className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.letterColour}>Members</h2>
        <div className={styles.addContainer} onClick={handleToggle}>
          <img
            className={styles.imgSize}
            src={`${process.env.PUBLIC_URL}/assets/images/btn-add.png`}
          />
          <p>Add Member</p>
        </div>
      </div>
      {!members.length ? (
        <p>No active Members</p>
      ) : (
        <TableMember
          onUpdateMember={updateMember}
          members={members}
          onDeleteMember={memberDelete}
          showForm={showForm}
          showEditForm={showEditForm}
          handleEditToggle={handleEditToggle}
          setEditForm={setEditForm}
        />
      )}
    </section>
  );
}

export default Members;
