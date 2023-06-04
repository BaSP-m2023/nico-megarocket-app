import React from 'react';
import styles from './edit-members.module.css';

const EditMember = ({ handleEditToggle, memberID, setMemberID, memberEditedId }) => {
  const handleClick = () => {
    handleEditToggle();
    setMemberID(memberID);
    memberEditedId(memberID);
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
