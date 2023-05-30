import React from 'react';
import styles from './table.module.css';

const Table = ({ data, deleteClass }) => {
  return (
    <section>
      <button className={styles.addClassButton}>Add Class</button>
      <table className="styles.containerTable">
        <thead>
          <tr>
            <th>Activity</th>
            <th>Hour</th>
            <th>Trainer</th>
            <th>Places</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        {data.length < 1 ? (
          <div className={styles.tableEmpty}>
            <div>
              <h3>The list is empty</h3>
            </div>
          </div>
        ) : (
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.activity}</td>
                  <td>{item.hour}</td>
                  <td>{item.trainer}</td>
                  <td>{item.places}</td>
                  <td></td>
                  <td>
                    <button className={styles.deleteButton} onClick={() => deleteClass(item.id)}>
                      <img src={`${process.env.PUBLIC_URL}/assets/images/trash-delete.svg`} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </section>
  );
};

export default Table;
