import React from 'react';
import styles from './table.module.css';

const Table = ({ data, deleteTrain }) => {
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Trainer</th>
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
          {data.length === 0 && (
            <tr>
              <td className={styles.noneTrainer} colSpan={8}>
                The list is empty
              </td>
            </tr>
          )}
          {data.map((item) => {
            return (
              <tr key={item._id}>
                <td>
                  {item.firstName} {item.lastName}
                </td>
                <td>{item.dni}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.city}</td>
                <td>${item.salary}</td>
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
    </div>
  );
};

export default Table;
