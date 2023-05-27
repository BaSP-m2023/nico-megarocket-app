import React from 'react';
import styles from './delete-member.module.css';

const DeleteMember = ({ memberId, onDeleteMember }) => {
  return (
    <div>
      <img
        className={styles.iconSize}
        src={`${process.env.PUBLIC_URL}/assets/images/trash-delete.svg`}
        onClick={() => onDeleteMember(memberId)}
      />
    </div>
  );
};

export default DeleteMember;
