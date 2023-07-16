import ButtonForm from '../ButtonForm';
import styles from '../Table/table.module.css';
import { ButtonActive } from '../index';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
const TableMobile = ({
  row,
  columnTitleArray,
  columns,
  handleClick,
  onConfirmOpen,
  ifArray,
  ifNotArrayNotObject,
  ifNotExist,
  ifObject,
  classes
}) => {
  const [desployed, setDesployed] = useState(true);
  const [arrow, setArrow] = useState(false);
  const located = useLocation().pathname;
  const classses = classes;
  const handleBlur = () => {
    setDesployed(true);
    setArrow(false);
  };
  const handlefocus = () => {
    setDesployed(false);
    setArrow(true);
  };

  const nameOfAllEntities = (item) => {
    if (item?.firstName) {
      return `${item.firstName} ${item.lastName}`;
    }
    if (item?.name) {
      return item.name;
    }
    if (item?.activity?.name) {
      return item.activity.name;
    }
    if (item?.classId) {
      const findActivity = classses.find((act) => act._id === item.classId._id);
      return `${findActivity.activity.name} - ${findActivity.hour}`;
    }
  };

  return (
    <>
      <div className={styles.containerTableMobile}>
        <div className={styles.arrowMobile} tabIndex={1} onBlur={handleBlur} onFocus={handlefocus}>
          <div className={styles.containerNameAndIcon}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/arrowMob.png`}
              className={arrow && styles.arrowDown}
            />
            <p>{nameOfAllEntities(row)}</p>
          </div>
        </div>
        <div className={`${desployed ? styles.containerTr : styles.containerTrDeployed}`}>
          <div className={styles.containerColumnsMobile}>
            {columnTitleArray.map((column, index) => (
              <p key={column[index]}>{`${column}:`}</p>
            ))}
            {(located === '/admin/trainers' || located === '/admin/members') && <p>Status:</p>}
            <p>Actions:</p>
          </div>
          <div className={styles.containerColumnsMobile}>
            {columns.map((columnM, index) => (
              <p key={index}>
                {ifArray(row[columnM])}
                {ifObject(row[columnM])}
                {ifNotArrayNotObject(row, columnM)}
                {ifNotExist(row[columnM])}
              </p>
            ))}
            {(located === '/admin/trainers' || located === '/admin/members') && (
              <p>
                <ButtonActive data={row} />
              </p>
            )}
            <div className={styles.containerActionsMobile}>
              {' '}
              <p>
                <ButtonForm
                  nameImg="pencil-edit.svg"
                  onAction={() => handleClick(row)}
                  testId="edit-btn"
                />
              </p>
              <p>
                <ButtonForm
                  nameImg="trash-delete.svg"
                  onAction={() => onConfirmOpen(row._id)}
                  testId="delete-btn"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableMobile;
