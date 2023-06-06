import { useEffect, useState } from 'react';
import styles from './members.module.css';
import TableMember from './TableMember';
import { ToastError } from '../Shared';
import AddButton from '../Shared/AddButton/index';

function Members() {
  const [members, setMembers] = useState([]);
  const [toastErroOpen, setToastErroOpen] = useState(false);

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

  return (
    <section className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.letterColour}>Members</h2>
        <div className={styles.addContainer}>
          <AddButton entity="members" path="/members/membersForm" />
        </div>
      </div>
      {!members.length ? (
        <p>No active Members</p>
      ) : (
        <TableMember members={members} setMembers={setMembers} />
      )}
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in Database" />
      )}
    </section>
  );
}

export default Members;
