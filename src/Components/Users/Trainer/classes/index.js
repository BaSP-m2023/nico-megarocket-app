import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from 'Components/Users/Member/classes/classes.module.css';
import { getClasses } from 'redux/classes/thunks';
import DivContainer from 'Components/Shared/Containers';

const TrainersClasses = () => {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes.list);

  useEffect(() => {
    getClasses(dispatch);
  }, []);

  const daysArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hoursArray = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00'
  ];
  const tableItem = (item, day, time) => {
    if (item.hour === time && item.day === day) {
      return <DivContainer item={item} key={item._id} />;
    }
  };

  return (
    <table className={styles.tableContainer}>
      <thead>
        <tr>
          <th className={styles.daysContainer}>Times</th>
          {daysArray.map((item, index) => {
            return (
              <th className={styles.daysContainer} key={index}>
                {item}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {hoursArray.map((row, index) => {
          return (
            <tr className={styles.trContainer2} key={index}>
              <td className={styles.trContainer}>{row}</td>
              {daysArray.map((day) => {
                return (
                  <td className={styles.tdContainer} key={day}>
                    {classes.map((item) => {
                      return tableItem(item, day, row);
                    })}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TrainersClasses;