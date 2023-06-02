import styles from './modal.module.css';

function Modal({ show, confirmDelete, closeModal }) {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <img
          className={styles.close_icon}
          onClick={closeModal}
          src={`${process.env.PUBLIC_URL}/assets/images/Delete.svg`}
          alt="cancel icon"
        />
        <p className={styles.modalTitle}>Are you sure you want to delete it?</p>
        <div className={styles.buttons}>
          <button className={styles.cancel_button} onClick={closeModal}>
            Cancel
          </button>
          <button className={styles.confirm_button} onClick={confirmDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
