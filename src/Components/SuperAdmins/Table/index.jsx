import React from 'react';
import styles from './table.module.css';

const Table = ({ data, deleteItem }) => {
  return (
    <table>
      <thead>
        <tr>
          <th className={styles.tableTitle}>Email</th>
          <th className={styles.tableTitle}>Password</th>
          <th className={styles.tableTitle}></th>
          <th className={styles.tableTitle}></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item.id}>
              <td className={styles.tableContainerTitle}>{item.email}</td>
              <td className={styles.tableContainerTitle}>{item.password}</td>
              <td className={styles.tableContainerBtn}>
                <button className={styles.tableBtn} onClick={() => deleteItem(item._id)}>
                  <img
                    className={styles.tableBtnImg}
                    src="../../../assets/images/trash-delete.svg"
                    alt="Delete"
                  />
                </button>
              </td>
              <td className={styles.tableContainerBtn}>
                <button className={styles.tableBtn}>
                  <img
                    className={styles.tableBtnImg}
                    src="../../../assets/images/pencil-edit.svg"
                    alt="Edit"
                  />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
