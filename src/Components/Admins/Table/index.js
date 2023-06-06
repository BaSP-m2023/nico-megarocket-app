import React, { useState } from 'react';
import styles from './table.module.css';
import { ModalConfirm, ModalSuccess } from '../../Shared';
import { useHistory } from 'react-router-dom';

function index({
  admins,
  setShowform,
  /*setAdminToEditId,*/ setEditMode,
  /*adminEditedId,*/ deleteAdm
}) {
  const [modalDeleteConfirmOpen, setModalDeleteConfirmOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [idAdmin, setIdAdmin] = useState('');

  const handleCreateClick = () => {
    setShowform(true);
    setEditMode(false);
  };

  const adminDelete = (id) => {
    setModalDeleteConfirmOpen(true);
    setIdAdmin(id);
  };

  const onConfirm = () => {
    deleteAdm(idAdmin);
    setModalDeleteConfirmOpen(false);
    setModalSuccessOpen(true);
    setSuccessMessage('Deleted succesffully');
  };
  const history = useHistory();

  const handleEditClick = (item) => {
    history.push(`/admins/form/${item._id}`, { params: { item, mode: 'edit' } });
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Admin</th>
            <th>DNI</th>
            <th>Phone</th>
            <th>E-Mail</th>
            <th>City</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {admins.length === 0 && (
            <tr>
              <td className={styles.noneAdmin} colSpan={7}>
                0 admins created
              </td>
            </tr>
          )}
          {admins.map((item) => {
            return (
              <tr key={item._id}>
                <td>
                  {item.firstName} {item.lastName}
                </td>
                <td>{item.dni}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.city}</td>
                <td>
                  <img
                    className={styles.trash_edit}
                    src={`${process.env.PUBLIC_URL}/assets/images/pencil-edit.svg`}
                    alt="modify icon"
                    onClick={() => {
                      handleEditClick(item);
                    }}
                  />
                </td>
                <td>
                  <img
                    className={styles.trash_edit}
                    src={`${process.env.PUBLIC_URL}/assets/images/trash-delete.svg`}
                    alt="delete icon"
                    onClick={() => {
                      adminDelete(item._id);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={7} className={styles.add_admin} onClick={handleCreateClick}>
              Create new admin
            </td>
          </tr>
        </tfoot>
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
}

export default index;
