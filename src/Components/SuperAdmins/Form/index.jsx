import React, { useState } from 'react';
import ModalConfirm from '../../Shared/Modals/ModalConfirm/index';

const Form = ({
  addItem,
  superAdminForm,
  setSuperAdminForm,
  showBtnAdd,
  showBtnMod,
  updateItem
}) => {
  const [actionType, setActionType] = useState(null);
  const [modalModifyConfirmOpen, setModalModifyConfirmOpen] = useState(false);

  const handleUpdateButtonClick = () => {
    setModalModifyConfirmOpen(true);
  };
  const handleModalConfirmation = () => {
    updateItem(superAdminForm);
    setSuperAdminForm({
      password: '',
      email: ''
    });
    setModalModifyConfirmOpen(false);
  };

  const onChangeInput = (e) => {
    setSuperAdminForm({
      ...superAdminForm,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (actionType === 'add') {
      addItem(superAdminForm);
    } else if (actionType === 'modify') {
      handleUpdateButtonClick();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>email</label>
        <input name="email" type="text" value={superAdminForm.email} onChange={onChangeInput} />
      </div>
      <div>
        <label>password</label>
        <input
          name="password"
          type="text"
          value={superAdminForm.password}
          onChange={onChangeInput}
        />
      </div>
      {showBtnAdd && (
        <button type="submit" onClick={() => setActionType('add')}>
          Agregar Super Admin
        </button>
      )}
      {showBtnMod && (
        <button type="submit" onClick={() => setActionType('modify')}>
          Modificar Super Admin
        </button>
      )}
      {modalModifyConfirmOpen && (
        <ModalConfirm
          method="Update"
          onConfirm={handleModalConfirmation}
          setModalConfirmOpen={setModalModifyConfirmOpen}
          message="Are you sure you want to update this?"
        />
      )}
    </form>
  );
};

export default Form;
