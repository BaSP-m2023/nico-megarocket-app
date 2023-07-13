import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from 'Components/Users/Member/classes/classes.module.css';
import { getClasses } from 'redux/classes/thunks';
import DivContainer from 'Components/Shared/Containers';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { Loader } from 'Components/Shared';

const MemberClasses = () => {
  const dispatch = useDispatch();
  let classes = useSelector((state) => state.classes.list);
  const classesArray = useSelector((state) => state.classes.list);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const userJoined = location.state && location.state.params;
  const [selectedClass, setSelectedClass] = useState(
    userJoined ? userJoined?.activity : classes[0]?.activity?.name
  );
  if (selectedClass) {
    classes = selectedClass
      ? classesArray.filter((item) => item.activity.name === selectedClass)
      : [];
  }

  useEffect(() => {
    if (classes.length > 0 && !selectedClass) {
      setSelectedClass(userJoined ? userJoined?.activity : classes[0]?.activity?.name);
    }
  }, [classes, selectedClass]);

  useEffect(() => {
    getClasses(dispatch);
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.table}>
          <div className={styles.titleSelect}>
            {!classes[0]?.activity?.name ? (
              <h3>Class was no created yet, select another class you want to join:</h3>
            ) : (
              <h3>Select the class you want to join:</h3>
            )}
            <select value={selectedClass || 'Pick class'} onChange={handleChange}>
              <option value="">Pick class</option>
              {classesArray.map((item, index) => (
                <option key={index} value={item.activity.name}>
                  {item.activity.name}
                </option>
              ))}
            </select>
          </div>
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
          <div className={styles.statusContainer}>
            <div className={`${styles.statusAvailable} ${styles.statusBox}`}>
              <p className={styles.textStatus}>Available</p>
            </div>
            <div className={`${styles.statusDisabled} ${styles.statusBox}`}>
              <p className={styles.textStatus}>Disabled</p>
            </div>
            <div className={`${styles.statusEnrolled} ${styles.statusBox}`}>
              <p className={styles.textStatus}>Enrolled</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MemberClasses;
