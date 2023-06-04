import React from 'react';
import styles from './addButton.module.css';
import { Link } from 'react-router-dom';

const AddButton = ({ entity, path }) => {
  return (
    <div className={styles.container_button}>
      <Link to={path} className={styles.link_styles}>
        <button className={styles.add_button}>
          <img
            className={styles.add_btn_img}
            src={`${process.env.PUBLIC_URL}/assets/images/btn-add.png`}
            alt="add icon"
          />
          <p className={styles.btn_text}>Add {entity}</p>
        </button>
      </Link>
    </div>
  );
};

export default AddButton;
