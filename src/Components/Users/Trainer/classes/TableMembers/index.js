import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styles from './table-member.module.css';
import { Loader } from 'Components/Shared';

function TableMember() {
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const data = location.state.membersClass;

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.wholeContainer}>
          <div className={styles.backButton}>
            <div
              className={styles.backButtonImg}
              onClick={() => {
                history.goBack();
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/back.png`}
                alt={`icon arrow pointing to left `}
              />
            </div>
          </div>
          <div className={styles.tableTitle}>Enrolled Members</div>
          <table className={styles.tableContainer}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Membership</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 && (
                <td colSpan="3" className={styles.notMembers}>
                  The list is empty
                </td>
              )}
              {data.map((member) => (
                <tr key={member._id}>
                  <td>{`${member.firstName} ${member.lastName}`}</td>
                  <td>{calculateAge(member.birthday)}</td>
                  <td
                    className={
                      member.membership === 'Black'
                        ? styles.blackMemb
                        : member.membership === 'Classic'
                        ? styles.classicMemb
                        : styles.onlyClass
                    }
                  >
                    {member.membership}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default TableMember;
