import React from 'react';
import styles from './addButton.module.css';

const AddButton = ({ entity, createMode }) => {
  return (
    <div className={styles.container_button}>
      <button className={styles.add_button} onClick={createMode}>
        <img
          className={styles.add_btn_img}
          src={`${process.env.PUBLIC_URL}/assets/images/btn-add.png`}
          alt="add icon"
        />
        <p className={styles.btn_text}>Add {entity}</p>
      </button>
    </div>
  );
};

export default AddButton;
