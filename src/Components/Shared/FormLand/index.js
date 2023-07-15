import { useState } from 'react';
import styles from '../../Home/home.module.css';
import ModalConfirm from '../Modals/ModalConfirm';
import ModalSuccess from '../Modals/ModalSuccess';

const FormLand = () => {
  const [val, setVal] = useState({});
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [modalSucc, setModalSucc] = useState(false);

  const openModal = () => {
    setModalConfirmOpen(true);
  };

  const closeModal = () => {
    setModalConfirmOpen(false);
    setModalSucc(true);
    setTimeout(() => {
      setVal({
        firstName: '',
        lastName: '',
        email: '',
        opcionSelected: 'chose',
        message: ''
      });
    }, 4000);
    setTimeout(() => {
      setModalSucc(false);
    }, 4000);
  };

  const handleChange = (e) => {
    setVal({ ...val, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    openModal();
  };

  return (
    <>
      <form className={styles.sectionTouchForm} onSubmit={handleSubmit}>
        <div className={styles.formContainerTop}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              className={styles.formInput}
              name="firstName"
              type="text"
              placeholder="Enter name"
              value={val.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="firstName">Last Name</label>
            <input
              className={styles.formInput}
              name="lastName"
              type="text"
              placeholder="Enter last name"
              value={val.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="emailAddress">Email address</label>
            <input
              className={styles.formInput}
              name="email"
              type="text"
              placeholder="Enter address"
              value={val.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input className={styles.formButtonDesktop} type="submit" value="Submit" />
          </div>
        </div>
        <div className={styles.formContainerBottom}>
          <div>
            <label>Contact Reason</label>
            <select name="opcionSelected" value={val.opcionSelected} onChange={handleChange}>
              <option value="chose">Chose contact reason</option>
              <option value="claim">I want to make a claim</option>
              <option value="suggestion">I want to realize a query or suggestion</option>
              <option value="membership">I want to know the memberships and costs</option>
            </select>
          </div>
          <div>
            <label>Message</label>
            <textarea
              name="message"
              placeholder="Enter your message"
              value={val.message}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <div>
          <input className={styles.formButtonTop} type="submit" value="Submit" />
        </div>
      </form>
      {modalConfirmOpen && (
        <ModalConfirm
          message="Are you sure you want send this?"
          method="Send"
          onConfirm={closeModal}
          setModalConfirmOpen={setModalConfirmOpen}
        />
      )}
      {modalSucc && (
        <ModalSuccess
          message={`${val.firstName?.charAt(0).toUpperCase() + val.firstName?.slice(1)} ${
            val.lastName?.charAt(0).toUpperCase() + val.lastName?.slice(1)
          } thank you for submitting the contact form. We will get back to you soon!`}
        />
      )}
    </>
  );
};

export default FormLand;
