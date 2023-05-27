import React from 'react';
import styles from './table-member.module.css';
import DeleteMember from '../DeleteMember';
import EditMember from '../EditMember';

const TableMember = ({ members }) => {
  const memberDelete = async (memberId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/member/${memberId}`, {
        method: 'DELETE'
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tr className={styles.tableContent}>
          <th>Full Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>City</th>
          <th>Status</th>
          <th>Postal Code</th>
          <th>Membership</th>
          <th>Actions</th>
        </tr>
        {members.map((member, index) => {
          const rowClass = index % 2 === 0 ? styles.rowBackground1 : styles.rowBackground2;
          return (
            <tr className={rowClass} key={index}>
              <td>
                {member.firstName} {member.lastName}
              </td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
              <td>{member.city}</td>
              <td>{member.isActive ? 'Active' : 'Inactive'}</td>
              <td>{member.postalCode}</td>
              <td>{member.membership}</td>
              <td className={styles.rowActions}>
                <EditMember memberId={member._id} />
                <DeleteMember memberId={member._id} onDeleteMember={memberDelete} />
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default TableMember;
