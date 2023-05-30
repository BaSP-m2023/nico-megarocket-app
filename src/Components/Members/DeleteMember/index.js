import React, { useState } from 'react';
import styles from './delete-member.module.css';
import ModalConfirm from '../../Modals/ModalConfirm';
import ModalSuccess from '../../Modals/ModalSuccess';

const DeleteMember = ({ memberId, onDeleteMember }) => {
  const [modalDeleteConfirmOpen, setModalDeleteConfirmOpen] = useState(false);
  const [modalSuccessConfirmOpen, setModalSuccessConfirmOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const handleClick = (memberId) => {
    setIdToDelete(memberId);
    setModalDeleteConfirmOpen(true);
  };

  const onConfirm = () => {
    onDeleteMember(idToDelete);
    setModalDeleteConfirmOpen(false);
    setModalSuccessConfirmOpen(true);
  };

  return (
    <div>
      <img
        className={styles.iconSize}
        src={`${process.env.PUBLIC_URL}/assets/images/trash-delete.svg`}
        onClick={() => handleClick(memberId)}
      />
      {modalDeleteConfirmOpen && (
        <ModalConfirm
          onConfirm={onConfirm}
          setModalConfirmOpen={setModalDeleteConfirmOpen}
          method="Delete"
          message="Are you sure to delete this member?"
        />
      )}
      {modalSuccessConfirmOpen && (
        <ModalSuccess
          setModalSuccessOpen={setModalSuccessConfirmOpen}
          message="Member delete successfully"
        />
      )}
    </div>
  );
};

export default DeleteMember;
