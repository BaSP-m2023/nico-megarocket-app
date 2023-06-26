import { Button } from 'Components/Shared';
import React from 'react';
import { logout } from 'redux/auth/thunks';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function LogOut() {
  const history = useHistory();
  const dispatch = useDispatch();
  const logoutAction = async () => {
    await dispatch(logout());
    history.push('/auth/login');
  };
  return (
    <div>
      <Button clickAction={logoutAction} text="Log Out" testId="" />
    </div>
  );
}

export default LogOut;
