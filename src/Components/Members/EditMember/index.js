import React from 'react';
import styles from './edit-members.module.css';

const EditMember = () => {
  return (
    <div>
      <img
        className={styles.iconSize}
        src={`${process.env.PUBLIC_URL}/assets/images/pencil-edit.svg`}
      />
    </div>
  );
};

export default EditMember;
