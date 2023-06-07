import styles from './table.module.css';

const TableComponent = ({
  columnTitleArray,
  data,
  editButton,
  deleteButton,
  columns,
  valueField,
  arrayAndObject,
  autoDelete
}) => {
  const fieldValue = valueField;
  {
    {
      data.length !== 0 &&
        arrayAndObject &&
        data.forEach((item) => {
          if (!item[arrayAndObject.object] || !item[arrayAndObject.array].length != 0) {
            autoDelete(item._id);
          }
        });
    }
  }

  return (
    <section className={styles.container}>
      {data.length === 0 ? (
        <div className={styles.noneTrainer}>
          <h3>The list is empty</h3>
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableContent}>
              {columnTitleArray.map((column, index) => (
                <th key={column[index]}>{column}</th>
              ))}
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              const rowClass = index % 2 === 0 ? styles.rowBackground1 : styles.rowBackground2;
              return (
                <tr className={rowClass} key={index}>
                  {columns.map((column, columnIndex) => (
                    <td key={columnIndex}>
                      {row[column] ? (
                        Array.isArray(row[column]) ? (
                          row[column].map((item, itemIndex) => (
                            <span key={itemIndex}>
                              {item[fieldValue.arrayFirstValue]} {item[fieldValue.arraySecondValue]}
                            </span>
                          ))
                        ) : typeof row[column] === 'object' ? (
                          <span>{row[column][fieldValue.objectValue]}</span>
                        ) : (
                          row[column]
                        )
                      ) : (
                        ''
                      )}
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
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default TableComponent;
