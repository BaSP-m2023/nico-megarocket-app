import React from 'react';

const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.email}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
