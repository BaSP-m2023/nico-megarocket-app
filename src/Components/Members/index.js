import { useEffect, useState } from 'react';
import styles from './members.module.css';

function Members() {
  const [members, setMembers] = useState([]);
  const getMembers = async () => {
    try {
      const reponse = await fetch(`${process.env.REACT_APP_API_URL}/member`);
      const data = await reponse.json();
      setMembers(data.data);
      console.log(members);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <section className={styles.container}>
      <h2>Members</h2>
    </section>
  );
}

export default Members;
