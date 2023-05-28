import { useEffect, useState } from 'react';
import styles from './members.module.css';
import TableMember from './TableMember';

function Members() {
  const [members, setMembers] = useState([]);
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

  return (
    <section className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.letterColour}>Members</h2>
        <div className={styles.addContainer}>
          <img
            className={styles.imgSize}
            src={`${process.env.PUBLIC_URL}/assets/images/btn-add.png`}
          />
          <p>Add Member</p>
        </div>
      </div>
      {members.length === 0 ? (
        <p>No active Members</p>
      ) : (
        <TableMember members={members} onDeleteMember={memberDelete} />
      )}
    </section>
  );
}

export default Members;
