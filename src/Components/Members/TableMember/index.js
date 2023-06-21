/*
import React, { useState } from 'react';
import styles from './table-member.module.css';
import DeleteMember from '../DeleteMember';
import EditMember from '../EditMember';
import { Form } from '../Form/MembersForm';
import { MembersEditForm } from '../EditForm/MembersEditForm';
const TableMember = ({
  members,
  onDeleteMember,
  onUpdateMember,
  showForm,
  showEditForm,
  handleEditToggle,
  setEditForm,
  setModalEditConfirmOpen,
  memberEditedId,
  memberEdited,
  setMemberEdited,
  setMembers
}) => {
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

  const [memberId, setmemberId] = useState(null);

const TableMember = ({ members, handleClick }) => {
  return (
    <TableComponent />
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
                <button onClick={() => handleClick(member)}>Edit</button>
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
*/
