import React from 'react';
import styles from './table.module.css';

function index({ admins }) {
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
          {admins.map((item) => {
            return (
              <tr key={item._id}>
                <td>
                  {item.firstName} {item.lastName}
                </td>
                <td>{item.dni}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.city}</td>
                <td>!</td>
                <td>X</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default index;
