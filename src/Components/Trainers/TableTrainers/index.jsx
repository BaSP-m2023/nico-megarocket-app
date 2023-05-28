import React from 'react';
import styles from './table.module.css';

const Table = ({ data, deleteTrain }) => {
  console.log(data);
  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>DNI</th>
          <th>Phone</th>
          <th>Email</th>
          <th>City</th>
          <th>Salary/Hour</th>
          <th>Modify</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item._id}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.dni}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>{item.city}</td>
              <td>{item.salary}</td>
              <td>
                <img
                  className={styles.trash_edit}
                  src={`${process.env.PUBLIC_URL}/assets/images/pencil-edit.svg`}
                  alt="modifiy icon"
                />
              </td>
              <td>
                <img
                  onClick={() => deleteTrain(item._id)}
                  className={styles.trash_edit}
                  src={`${process.env.PUBLIC_URL}/assets/images/trash-delete.svg`}
                  alt="delete icon"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
