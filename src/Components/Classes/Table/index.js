import React, { useState, useEffect } from 'react';
import styles from './table.module.css';
import { ModalConfirm } from '../../Shared';

const Table = ({ data, deleteClass, updateClick, autoDelete, classes }) => {
  const [modalDeleteConfirmOpen, setModalDeleteConfirmOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState('');

  const handleDeleteButtonClick = (id) => {
    setSelectedItemId(id);
    setModalDeleteConfirmOpen(true);
  };

  const handleModalConfirmation = () => {
    deleteClass(selectedItemId);
    setModalDeleteConfirmOpen(false);
  };

  const getClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/class`);
      const data = await response.json();
      classes.setClasses(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

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
              <th>Activity</th>
              <th>Day</th>
              <th>Hour</th>
              <th>Trainer</th>
              <th>Places</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.forEach((item) => {
              if (!item.activity || !item.trainer) {
                autoDelete(item._id);
              }
            })}
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.activity ? item.activity.name : 'This Activity was DELETED'}</td>
                  <td>{item.day}</td>
                  <td>{item.hour}</td>
                  <td>
                    {item.trainer
                      ? item.trainer.map(
                          (trainerOne) => `${trainerOne.firstName} ${trainerOne.lastName}`
                        )
                      : 'This Trainer was DELETED'}
                  </td>
                  <td>{item.slots}</td>
                  <td>
                    <img
                      className={styles.trash_edit}
                      onClick={() => updateClick(item)}
                      src={`${process.env.PUBLIC_URL}/assets/images/pencil-edit.svg`}
                    />
                  </td>
                  <td>
                    <img
                      className={styles.trash_edit}
                      onClick={() => handleDeleteButtonClick(item._id)}
                      src={`${process.env.PUBLIC_URL}/assets/images/trash-delete.svg`}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
          {modalDeleteConfirmOpen && (
            <ModalConfirm
              method="Delete"
              onConfirm={handleModalConfirmation}
              setModalConfirmOpen={setModalDeleteConfirmOpen}
              message="Are you sure you want to delete this?"
            />
          )}
        </table>
      )}
    </section>
  );
};

export default Table;
