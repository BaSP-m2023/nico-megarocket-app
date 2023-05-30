// import React, { useState } from 'react';
import styles from './table.module.css';

function index({ admins, setShowform, setAdminToEditId, setEditMode, adminEditedId }) {
  const handleCreateClick = () => {
    setShowform(true);
  };

  const handleEditClick = (id) => {
    setShowform(true);
    setEditMode(true);
    adminEditedId(id);
    setAdminToEditId(id);
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Admin</th>
            <th>DNI</th>
            <th>Phone</th>
            <th>E-Mail</th>
            <th>City</th>
            <th>Modify</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  {item.firstName} {item.lastName}
                </td>
                <td>{item.dni}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.city}</td>
                <td>
                  <img
                    className={styles.trash_edit}
                    src={`${process.env.PUBLIC_URL}/assets/images/pencil-edit.svg`}
                    alt="modify icon"
                    onClick={() => {
                      handleEditClick(item._id);
                    }}
                  />
                </td>
                <td>
                  <img
                    className={styles.trash_edit}
                    src={`${process.env.PUBLIC_URL}/assets/images/trash-delete.svg`}
                    alt="delete icon"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={7} className={styles.add_admin} onClick={handleCreateClick}>
              Create new admin
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default index;
