import React, { useState } from 'react';
import styles from './table.module.css';
import { ModalConfirm } from '../../Shared/';

const Table = ({ data, deleteItem, form, setSuperAdminForm }) => {
  const [modalDeleteConfirmOpen, setModalDeleteConfirmOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState('');

  const handleDeleteButtonClick = (id) => {
    setSelectedItemId(id);
    setModalDeleteConfirmOpen(true);
  };

  const handleModalConfirmation = () => {
    deleteItem(selectedItemId);
    setModalDeleteConfirmOpen(false);
  };
  const handleEditButton = (item) => {
    setSuperAdminForm({
      ...item
    });
    form(true);
  };

  return (
    <table>
      <thead>
        <tr>
          <th className={styles.tableTitle}>Email</th>
          <th className={styles.tableTitle}>Password</th>
          <th className={styles.tableTitle}></th>
          <th className={styles.tableTitle}></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item.id}>
              <td className={styles.tableContainerTitle}>{item.email}</td>
              <td className={styles.tableContainerTitle}>{item.password}</td>
              <td className={styles.tableContainerBtn}>
                <button
                  className={styles.tableBtn}
                  onClick={() => handleDeleteButtonClick(item._id)}
                >
                  <img
                    className={styles.tableBtnImg}
                    src="../../../assets/images/trash-delete.svg"
                    alt="Delete"
                  />
                </button>
              </td>
              <td className={styles.tableContainerBtn}>
                <button className={styles.tableBtn} onClick={() => handleEditButton(item)}>
                  <img
                    className={styles.tableBtnImg}
                    src="../../../assets/images/pencil-edit.svg"
                    alt="Edit"
                  />
                </button>
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
  );
};

export default Table;
