import React, { useState } from 'react';

const Form = ({
  addItem,
  superAdminForm,
  setSuperAdminForm,
  showBtnAdd,
  showBtnMod,
  updateItem
}) => {
  const [actionType, setActionType] = useState(null);

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
      updateItem(superAdminForm);
    }
    setSuperAdminForm({
      password: '',
      email: ''
    });
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
    </form>
  );
};

export default Form;
