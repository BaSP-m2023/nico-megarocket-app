import React, { useState } from 'react';
import { ModalConfirm } from '../../Shared';
import { TableComponent } from '../../Shared';

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
    <div>
      <TableComponent
        columnTitleArray={['Email', 'Password']}
        data={data}
        handleClick={handleEditButton}
        deleteButton={handleDeleteButtonClick}
        columns={['email', 'password']}
        autoDelete={() => {}}
      />

      {modalDeleteConfirmOpen && (
        <ModalConfirm
          method="Delete"
          onConfirm={handleModalConfirmation}
          setModalConfirmOpen={setModalDeleteConfirmOpen}
          message="Are you sure you want to delete this?"
        />
      )}
    </div>
  );
};

export default Table;
