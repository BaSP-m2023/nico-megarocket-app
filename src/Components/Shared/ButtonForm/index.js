import React from 'react';
import styles from './button.module.css';

function ButtonForm({ nameImg, onAction, testId }) {
  return (
    <div data-testid={testId}>
      <img
        className={styles.icon}
        onClick={onAction}
        src={`${process.env.PUBLIC_URL}/assets/images/${nameImg}`}
      />
    </div>
  );
}

export default ButtonForm;
