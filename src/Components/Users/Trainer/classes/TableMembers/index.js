import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function TableMember() {
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  const location = useLocation();
  const data = location.state.membersClass;
  console.log(data, 'tabla member');

  return (
    <div>
      <h1>TABLA MEMBER</h1>
    </div>
  );
}

export default TableMember;
