import React from 'react';

const TableMember = ({ members }) => {
  console.log(members);
  return (
    <div>
      <table>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>City</th>
          <th>Status</th>
          <th>Postal Code</th>
          <th>Membership</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </table>
    </div>
  );
};

export default TableMember;
