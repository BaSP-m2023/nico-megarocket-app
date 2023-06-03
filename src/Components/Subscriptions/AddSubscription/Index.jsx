import { useState } from 'react';
import style from './modalAdd.module.css';
import ModalConfirm from '../../Shared/Modals/ModalConfirm/index';
import ModalSuccess from '../../Shared/Modals/ModalSuccess/index';

const ModalAddSubscription = ({
  setModalAdd,
  subscription,
  setSubscription,
  setTable,
  editSubscriptions,
  setEditSubscriptions,
  editId,
  editSubscription,
  editMode
}) => {
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [bodySubscription, setBodySubscription] = useState({
    classes: '',
    member: '',
    date: ''
  });
  const changeInput = (e) => {
    setBodySubscription({
      ...bodySubscription,
      [e.target.name]: e.target.value
    });
  };
  const validFields = Object.values(bodySubscription).every((field) => field.length >= 3);
  setBodySubscription(!validFields);
  const changeInputEdit = (e) => {
    setEditSubscriptions({
      classes: bodySubscription.classes || editSubscriptions.classes,
      member: bodySubscription.member || editSubscriptions.member,
      date: bodySubscription.date || bodySubscription.date,
      [e.target.name]: e.target.value
    });
  };
  const createSubscriptionDB = async (bodySubscription) => {
    try {
      const newSubscription = await fetch(`${process.env.REACT_APP_API_URL}/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(bodySubscription)
      });
      return newSubscription.json();
    } catch (error) {
      console.error(error);
    }
  };
  const addSubscription = async ({ classes, member, date }) => {
    let addedSubscription = {
      classes,
      member,
      date
    };
    const newSubscriptionCreated = await createSubscriptionDB(addedSubscription);
    setSubscription([...subscription, newSubscriptionCreated]);
  };
  const submitSubscription = (e) => {
    e.preventDefault();
    if (editMode) {
      editSubscription(editId);
      window.location.reload();
    } else {
      addSubscription(bodySubscription);
      setBodySubscription({
        classes: '',
        member: '',
        date: ''
      });
    }
    setModalConfirmOpen(false);
    setModalSuccessOpen(true);
  };
  const handleConfirmEdit = (e) => {
    e.preventDefault();
    setModalConfirmOpen(true);
  };
  return (
    <section className={style.containerModal}>
      <form onSubmit={handleConfirmEdit} className={style.containerForm}>
        <h3>Add subscription</h3>
        <div>
          <label>Class:</label>
          {editMode ? (
            <input
              type="text"
              value={editSubscription.classes}
              name="classes"
              onChange={changeInputEdit}
            />
          ) : (
            <input
              type="text"
              value={bodySubscription.classes}
              name="classes"
              onChange={changeInput}
            />
          )}
        </div>
        <div>
          <label>Member:</label>
          {editMode ? (
            <input
              type="text"
              value={editSubscription.member}
              name="member"
              onChange={changeInputEdit}
            />
          ) : (
            <input
              type="text"
              value={bodySubscription.member}
              name="member"
              onChange={changeInput}
            />
          )}
        </div>
        <div>
          <label>Date:</label>
          {editMode ? (
            <input
              type="text"
              value={editSubscription.date}
              name="date"
              onChange={changeInputEdit}
            />
          ) : (
            <input type="text" value={bodySubscription.date} name="date" onChange={changeInput} />
          )}
        </div>
        <div className={style.containerAdd}>
          <button
            onClick={() => {
              setModalAdd(false);
              setTable(true);
            }}
          >
            Cancel
          </button>
          {!validFields ? (
            <button>Save</button>
          ) : (
            <button disabled className={style.disableButton}>
              Save
            </button>
          )}
        </div>
        {modalConfirmOpen && (
          <ModalConfirm
            method="EDIT"
            onConfirm={() => {
              submitSubscription();
            }}
            message="Are you sure you want to perform this action?"
            setModalConfirmOpen={setModalConfirmOpen}
          />
        )}
        {modalSuccessOpen && (
          <ModalSuccess message="Success!" setModalSuccessOpen={setModalSuccessOpen} />
        )}
      </form>
    </section>
  );
};
export default ModalAddSubscription;
