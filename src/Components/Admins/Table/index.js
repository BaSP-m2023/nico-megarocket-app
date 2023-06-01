import React, { useState } from 'react';
import styles from './table.module.css';
import Modal from '../Modals/ModalDelete/ModalDelete';
import ModalDeleteConfirmation from '../Modals/ModalDeleteConfirmation/ModalDeleteConfirmation';

function index({ admins, setShowform, setAdminToEditId, setEditMode, adminEditedId }) {

  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [adminToDeleteId, setAdminToDeleteId] = useState('');
  const [adminFullName, setAdminFullName] = useState('');

  const handleCreateClick = () => {
    setShowform(true);
    setEditMode(false);
  };

  const handleEditClick = (id) => {
    setShowform(true);
    setEditMode(true);
    adminEditedId(id);
    setAdminToEditId(id);
  }

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDeleteClick = (id) => {
    setShowModal(true);
    setAdminToDeleteId(id);
  };

  const confirmDelete = () => {
    deleteAdm(adminToDeleteId);
    closeModal();
    setShowConfirmationModal(true);
  };

  return (
    <div className={styles.container}>
      <Modal show={showModal} confirmDelete={confirmDelete} closeModal={closeModal} />
      {showConfirmationModal && (
        <ModalDeleteConfirmation
          show={showConfirmationModal}
          setShowConfirmationModal={setShowConfirmationModal}
          adminFullName={adminFullName}
        />
      )}
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
          {admins.map((item, index) => {
            return (
              <tr key={index}>
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
                      handleEditClick(item._id);
                    }}
                  />
                </td>
                <td>
                  <img
<<<<<<< HEAD
=======
                    onClick={() => {
                      handleDeleteClick(item._id);
                      setAdminFullName(item.firstName + ' ' + item.lastName);
                    }}
>>>>>>> origin/master
                    className={styles.trash_edit}
                    src={`${process.env.PUBLIC_URL}/assets/images/trash-delete.svg`}
                    alt="delete icon"
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
    </div>
  );
}

export default index;
