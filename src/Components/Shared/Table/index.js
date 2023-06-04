import React from 'react';
import styles from './table.module.css';

const Table2 = ({ columnTitleArray, data, editButton, deleteButton, columns }) => {
  return (
    <section className={styles.container}>
      {data.length === 0 ? (
        <div className={styles.noneTrainer}>
          <h3>The list is empty</h3>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              {columnTitleArray.map((column, index) => (
                <th key={column[index]}>{column}</th>
              ))}
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {console.log('entré al primer map')}
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex}>
                    {Array.isArray(row[column])
                      ? row[column].map((item, itemIndex) => (
                          <span key={itemIndex}>
                            {item.firstName} {item.lastName}
                            {console.log('Soy un array')}
                          </span>
                        ))
                      : typeof row[column] === 'object'
                      ? console.log(row[column])
                      : row[column]}
                  </td>
                ))}
                <td>
                  <img
                    className={styles.trash_edit}
                    onClick={() => editButton(row)}
                    src={`${process.env.PUBLIC_URL}/assets/images/pencil-edit.svg`}
                  />
                </td>
                <td>
                  <img
                    className={styles.trash_edit}
                    onClick={() => deleteButton(row._id)}
                    src={`${process.env.PUBLIC_URL}/assets/images/trash-delete.svg`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default Table2;
