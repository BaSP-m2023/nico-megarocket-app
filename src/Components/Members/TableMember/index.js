import React from 'react';
import styles from './table-member.module.css';

const TableMember = ({ members }) => {
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
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default TableMember;
