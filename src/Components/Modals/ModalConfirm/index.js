import React from 'react';

const ModalConfirm = ({ message, method, fn, setModalConfirmOpen }) => {
  return (
    <div>
      <div>
        <p>Attention</p>
        <p>{message}</p>
        <button
          onClick={() => {
            fn();
            setModalConfirmOpen(false);
          }}
        >
          {method}
        </button>
        <button
          onClick={() => {
            setModalConfirmOpen(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ModalConfirm;
