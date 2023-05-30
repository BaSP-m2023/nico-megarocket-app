import React from 'react';
import styles from './edit-members.module.css';

const EditMember = ({ handleEditToggle, memberID, setMemberID }) => {
  const handleClick = () => {
    handleEditToggle();
    setMemberID(memberID);
  };

  return (
    <div>
      <img
        className={styles.iconSize}
        src={`${process.env.PUBLIC_URL}/assets/images/pencil-edit.svg`}
        onClick={handleClick}
      />
    </div>
  );
};

export default EditMember;
