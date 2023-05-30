import React, { useState } from 'react';

const Form = ({ addItem }) => {
  const [superAdmin, setSuperAdmin] = useState({
    email: '',
    password: ''
  });

  const onChangeInput = (e) => {
    setSuperAdmin({
      ...superAdmin,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addItem(superAdmin);
    setSuperAdmin({
      password: '',
      email: ''
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>email</label>
        <input name="email" type="text" value={superAdmin.email} onChange={onChangeInput} />
      </div>
      <div>
        <label>password</label>
        <input name="password" type="text" value={superAdmin.password} onChange={onChangeInput} />
      </div>
      <button type="submit">Agregar Super Admin</button>
    </form>
  );
};

export default Form;
