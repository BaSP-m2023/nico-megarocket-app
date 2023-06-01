import React, { useState } from 'react';
import styles from './table.module.css';
import ModalConfirm from '../../Modals/ModalConfirm/index';
import ModalSuccess from '../../Modals/ModalSuccess/index';

const Table = ({ data, deleteTrain }) => {
  const [modalDeleteConfirmOpen, setModalDeleteConfirmOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [idTrainer, setIdTrainer] = useState('');

  const somefunction = (id) => {
    setModalDeleteConfirmOpen(true);
    setIdTrainer(id);
  };

  const onConfirm = () => {
    deleteTrain(idTrainer);
    setModalDeleteConfirmOpen(false);
    setModalSuccessOpen(true);
    setSuccessMessage('Deleted succesffully');
  };

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Trainer</th>
            <th>DNI</th>
            <th>Phone</th>
            <th>Email</th>
            <th>City</th>
            <th>Salary/Hour</th>
            <th>Modify</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td className={styles.noneTrainer} colSpan={8}>
                The list is empty
              </td>
            </tr>
          )}
          {data.map((item) => {
            return (
              <tr key={item._id}>
                <td>
                  {item.firstName} {item.lastName}
                </td>
                <td>{item.dni}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.city}</td>
                <td>${item.salary}</td>
                <td>
                  <img
                    className={styles.trash_edit}
                    src={`${process.env.PUBLIC_URL}/assets/images/pencil-edit.svg`}
                    alt="modifiy icon"
                  />
                </td>
                <td>
                  <img
                    onClick={() => {
                      somefunction(item._id);
                    }}
                    className={styles.trash_edit}
                    src={`${process.env.PUBLIC_URL}/assets/images/trash-delete.svg`}
                    alt="delete icon"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {modalDeleteConfirmOpen && (
        <ModalConfirm
          method="Delete"
          onConfirm={onConfirm}
          setModalConfirmOpen={setModalDeleteConfirmOpen}
          message="Are you sure you want to delete this?"
        />
      )}
      {modalSuccessOpen && (
        <ModalSuccess setModalSuccessOpen={setModalSuccessOpen} message={successMessage} />
      )}
    </div>
  );
};

export default Table;
