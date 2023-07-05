import ButtonForm from '../ButtonForm';
import styles from './table.module.css';
import { useState } from 'react';
import { ModalConfirm, ModalSuccess, ButtonActive } from '../index';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const TableComponent = ({
  columnTitleArray,
  data,
  handleClick,
  deleteButton,
  columns,
  valueField,
  classes,
  testId
}) => {
  const fieldValue = valueField;
  const [successModal, setModalSuccess] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [idDelete, setIdDelete] = useState('');
  const dispatch = useDispatch();
  const located = useLocation().pathname;
  const [filtered, setFiltered] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filtered.length / 6);
  const sliceStart = (currentPage - 1) * 6;
  const sliceEnd = sliceStart + 6;
  const newData = filtered.slice(sliceStart, sliceEnd);

  const onConfirmOpen = (id) => {
    setModalConfirm(true);
    setIdDelete(id);
  };

  const onConfirm = () => {
    dispatch(deleteButton(idDelete));
    setModalSuccess(true);
  };

  const ifArray = (item) => {
    if (item) {
      if (Array.isArray(item)) {
        if (item.length === 1) {
          return item[0][fieldValue?.arrayFirstValue] + ' ' + item[0][fieldValue?.arraySecondValue];
        } else {
          return (
            item[0][fieldValue?.arrayFirstValue] +
            ' ' +
            item[0][fieldValue?.arraySecondValue] +
            ' + ' +
            (item.length - 1)
          );
        }
      }
    }
  };

  const ifObject = (item) => {
    if (item) {
      if (item.activity) {
        const findActivity = classes.find((act) => act._id === item._id);
        return findActivity?.activity && `${findActivity.activity?.name} - ${findActivity?.hour}`;
      }
      if (typeof item === 'object') {
        return <span>{item[fieldValue?.objectValue]}</span>;
      }
    }
  };

  const ifNotArrayNotObject = (item, itemContent) => {
    if (typeof item[itemContent] !== 'object' && !Array.isArray(item[itemContent])) {
      if (itemContent === 'firstName') {
        return (
          <span>
            {item?.firstName} {item?.lastName}
          </span>
        );
      } else if (itemContent === 'date') {
        const date = new Date(item.date);
        const format = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        };
        const dateFixed = date.toLocaleDateString(format);
        return item?.date && dateFixed;
      } else {
        return item[itemContent];
      }
    }
  };

  const ifNotExist = (item) => {
    if (item?.length === 0) {
      return <span>This element Was Deleted. Edit to add</span>;
    }
  };

  const handlerChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filters = data.filter((item) => {
      if (item.name && item.name.toLowerCase().includes(searchValue)) {
        return true;
      }
      if (item.activity && item.activity.name.toLowerCase().includes(searchValue)) {
        return true;
      }
      if (item.firstName && item.firstName.toLowerCase().includes(searchValue)) {
        return true;
      }
      if (item.classId) {
        const findActivity = classes.find((act) => act._id === item.classId._id);
        if (findActivity && findActivity.activity.name.toLowerCase().includes(searchValue)) {
          return true;
        }
      }
      return false;
    });
    setFiltered(filters);
    setCurrentPage(1);
  };

  useEffect(() => {
    setFiltered(data);
    if (filtered.length === 0) {
      setFiltered(data);
    }
  }, [data]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={currentPage === i ? styles.activePage : styles.eachNumber}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <section className={styles.container} data-testid={testId}>
      <div onChange={handlerChange} className={styles.containerSearch}>
        <input type="text" placeholder="What are you looking for?" className={styles.searchField} />
        <button className={styles.buttonSearch}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/lupa.png`}
            className={styles.magGlass}
          />
        </button>
      </div>
      {newData?.length === 0 ? (
        <div className={styles.noneTrainer}>
          <h3>The list is empty</h3>
        </div>
      ) : (
        <div className={styles.containerTable}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableContent}>
                {columnTitleArray.map((column, index) => (
                  <th key={column[index]}>{column}</th>
                ))}
                {(located === '/admin/trainers' || located === '/admin/members') && <th>Active</th>}
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {newData.map((row, index) => {
                const rowClass = index % 2 === 0 ? styles.rowBackground1 : styles.rowBackground2;

                return (
                  <tr className={rowClass} key={index}>
                    {columns.map((column, columnIndex) => (
                      <td key={columnIndex}>
                        {ifArray(row[column])}
                        {ifObject(row[column])}
                        {ifNotArrayNotObject(row, column)}
                        {ifNotExist(row[column])}
                      </td>
                    ))}
                    {(located === '/admin/trainers' || located === '/admin/members') && (
                      <td>
                        <ButtonActive data={row} />
                      </td>
                    )}
                    <td>
                      <ButtonForm
                        nameImg="pencil-edit.svg"
                        onAction={() => handleClick(row)}
                        testId="edit-btn"
                      />
                    </td>
                    <td>
                      <ButtonForm
                        nameImg="trash-delete.svg"
                        onAction={() => onConfirmOpen(row._id)}
                        testId="delete-btn"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={styles.containerPaginate}>
            <button
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
              className={styles.buttonPaginate}
            >{`←`}</button>
            {renderPageNumbers()}
            <button
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={styles.buttonPaginate}
            >{`→`}</button>
          </div>
        </div>
      )}
      {modalConfirm && (
        <ModalConfirm
          onConfirm={() => onConfirm()}
          message="Are you sure to delete this?"
          method="Delete"
          setModalConfirmOpen={setModalConfirm}
          testId="delete-confirm-modal"
        />
      )}
      {successModal && (
        <ModalSuccess
          setModalSuccessOpen={setModalSuccess}
          message="Delete Successfully"
          testId="delete-success-modal"
        />
      )}
    </section>
  );
};

export default TableComponent;
