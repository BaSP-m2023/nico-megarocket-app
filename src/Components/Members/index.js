import { useEffect, useState } from 'react';
import styles from './members.module.css';
import TableMember from '../TableMember';

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
  }, [members]);

  return (
    <section className={styles.container}>
      <h2>Members</h2>
      <TableMember members={members} />
    </section>
  );
}

export default Members;
