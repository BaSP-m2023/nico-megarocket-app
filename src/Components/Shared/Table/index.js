import ButtonForm from '../ButtonForm';
import styles from './table.module.css';

const TableComponent = ({
  columnTitleArray,
  data,
  handleClick,
  deleteButton,
  columns,
  valueField,
  arrayAndObject,
  autoDelete
}) => {
  const fieldValue = valueField;
  {
    arrayAndObject &&
      data.forEach((item) => {
        if (!item[arrayAndObject.object] || !item[arrayAndObject.array].length != 0) {
          autoDelete(item._id);
        }
      });
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
                    <ButtonForm nameImg="pencil-edit.svg" onAction={() => handleClick(row)} />
                  </td>
                  <td>
                    <ButtonForm nameImg="trash-delete.svg" onAction={() => deleteButton(row._id)} />
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
