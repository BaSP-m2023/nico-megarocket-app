import React from 'react';

const Table = ({ data, deleteItem }) => {
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
              <td>
                <button onClick={() => deleteItem(item._id)}>X</button>
              </td>
              <td>
                <button>E</button>
              </td>
              <td>
                <button>V</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
