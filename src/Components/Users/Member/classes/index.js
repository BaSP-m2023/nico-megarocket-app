import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from 'Components/Users/Member/classes/classes.module.css';
import { getClasses } from 'redux/classes/thunks';
import DivContainer from 'Components/Shared/Containers';

const MemberClasses = () => {
  const dispatch = useDispatch();
  const classesArray = useSelector((state) => state.classes.list);
  const [selectedClass, setSelectedClass] = useState('');
  let classes = useSelector((state) => state.classes.list);
  if (selectedClass) {
    classes = classesArray.filter((item) => item.activity.name === selectedClass);
  }
  console.log(selectedClass);

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
      return <DivContainer item={item} key={item._id} testId="classes-container" />;
    }
  };

  const handleChange = (event) => {
    setSelectedClass(event.target.value);
  };

  console.log(classes);

  return (
    <div>
      <select onChange={handleChange}>
        <option value="">Pick Class</option>
        {classesArray.map((item, index) => {
          return (
            <option key={index} value={item._id ? item.activity.name : item}>
              {item.activity.name}
            </option>
          );
        })}
      </select>
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
    </div>
  );
};

export default MemberClasses;
