import React, { useState } from 'react';
import styles from './table.module.css';
import ModalsConfirmation from '../../Modals/ModalConfirm';

const Table = ({ data, deleteClass, editClass }) => {
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

  return (
    <section className={styles.container}>
      <button className={styles.addClassButton}>Add Class</button>
      <table>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Hour</th>
            <th>Trainer</th>
            <th>Places</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        {!data ? (
          <div className={styles.nonTrainer}>
            <div>
              <h3>The list is empty</h3>
            </div>
          </div>
        ) : (
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.activity ? item.activity.name : ''}</td>
                  <td>{item.hour}</td>
                  <td>
                    {item.trainer.map((trainerOne) => {
                      return `${trainerOne.firstName} ${trainerOne.lastName}`;
                    })}
                  </td>
                  <td>{item.slots}</td>
                  <td>
                    <img
                      className={styles.trash_edit}
                      onClick={() => editClass(item._id)}
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
        )}
        {modalDeleteConfirmOpen && (
          <ModalsConfirmation
            method="Delete"
            onConfirm={handleModalConfirmation}
            setModalConfirmOpen={setModalDeleteConfirmOpen}
            message="Are you sure you want to delete this?"
          />
        )}
      </table>
    </section>
  );
};

export default Table;
