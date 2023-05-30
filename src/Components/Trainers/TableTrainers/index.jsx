import React, { useState } from 'react';
import styles from './table.module.css';
import FormEdit from '../FormEditTrainers/FormEditTrainer';

// eslint-disable-next-line no-unused-vars
const Table = ({ data, setTrainerToEdit, setTrainers, trainers }) => {
  const [trainerModify, setTrainerModify] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEditClick = (id) => {
    const trainer = data.find((item) => item._id === id);
    setTrainerModify(trainer);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
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
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.dni}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.city}</td>
                <td>{item.salary}</td>
                <td>
                  <img
                    onClick={() => handleEditClick(item._id)}
                    className={styles.trash_edit}
                    src={`${process.env.PUBLIC_URL}/assets/images/pencil-edit.svg`}
                    alt="modifiy icon"
                  />
                </td>
                <td>
                  <img
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
      {showForm && (
        <FormEdit
          trainerModify={trainerModify}
          closeForm={closeForm}
          setTrainers={setTrainers}
          trainers={trainers}
        />
      )}
    </div>
  );
};

export default Table;
