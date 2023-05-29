import React from 'react';

const ModalSuccess = ({ setModalSuccessOpen, message }) => {
  return (
    <div>
      <div>
        <p>SUCCESSFUL</p>
        <p>{message}</p>
        <button onClick={() => setModalSuccessOpen(false)}>OK</button>
      </div>
    </div>
  );
};

export default ModalSuccess;
