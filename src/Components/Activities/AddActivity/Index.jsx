import { useState } from 'react';
import style from './modalAdd.module.css';
import { ModalConfirm } from '../../Shared';
import { ModalSuccess } from '../../Shared';

const ModalAddActivity = ({
  setModalAdd,
  activity,
  setActivity,
  setTable,
  editActivities,
  setEditActivities,
  editId,
  editActivity,
  editMode
}) => {
  const [active, setActive] = useState(true);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [bodyActivity, setBodyActivity] = useState({
    name: '',
    description: '',
    isActive: ''
  });

  const changeInput = (e) => {
    const newActivity = { ...bodyActivity, [e.target.name]: e.target.value };
    setBodyActivity(newActivity);

    const allFieldsValid = Object.values(newActivity).every((value) => {
      return value.length >= 3 && value !== '';
    });

    setActive(!allFieldsValid);
  };

  const changeInputEdit = (e) => {
    setEditActivities({
      name: bodyActivity.name || editActivities.name,
      description: bodyActivity.description || editActivities.description,
      isActive: bodyActivity.isActive || editActivities.isActive,

      [e.target.name]: e.target.value
    });

    if (e.target.value.length >= 3) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  const createActivityDB = async (bodyActivity) => {
    try {
      const activityNew = await fetch(`${process.env.REACT_APP_API_URL}/activity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyActivity)
      });
      return activityNew.json();
    } catch (error) {
      console.error(error);
    }
  };

  const addActivity = async ({ name, description, isActive }) => {
    let newActivity = {
      name,
      description,
      isActive
    };

    const newActivityCreated = await createActivityDB(newActivity);
    setActivity([...activity, newActivityCreated]);
  };

  const submitActivity = () => {
    if (editMode) {
      editActivity(editId);
      window.location.reload();
    } else {
      addActivity(bodyActivity);
      setBodyActivity({
        name: '',
        description: '',
        isActive: ''
      });
    }
    setModalConfirmOpen(false);
    setModalSuccessOpen(true);
  };

  const handleConfirmEdit = (e) => {
    e.preventDefault();
    setModalConfirmOpen(true);
  };

  const goBackTable = () => {
    setTimeout(() => {
      setModalAdd(false);
      setTable(true);
    }, 1000);
  };

  return (
    <section className={style.containerModal}>
      <form onSubmit={handleConfirmEdit} className={style.containerForm}>
        <h3>Add</h3>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={editMode ? editActivities.name : bodyActivity.name}
            name="name"
            onChange={editMode ? changeInputEdit : changeInput}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={editMode ? editActivities.description : bodyActivity.description}
            name="description"
            onChange={editMode ? changeInputEdit : changeInput}
          />
        </div>
        <div>
          <label>isActive</label>
          <input
            type="text"
            value={editMode ? editActivities.isActive : bodyActivity.isActive}
            name="isActive"
            onChange={editMode ? changeInputEdit : changeInput}
          />
        </div>
        <div className={style.containerAddButton}>
          <button
            onClick={() => {
              setModalAdd(false);
              setTable(true);
            }}
          >
            Cancel
          </button>
          {!active ? (
            <button>Save</button>
          ) : (
            <button disabled className={style.buttonDisabled}>
              Save
            </button>
          )}
        </div>
      </form>
      {modalConfirmOpen && (
        <ModalConfirm
          method="Confirm"
          onConfirm={() => {
            submitActivity();
          }}
          message="Are you sure you want to perform this action?"
          setModalConfirmOpen={setModalConfirmOpen}
        />
      )}
      {modalSuccessOpen && (
        <>
          <ModalSuccess message="¡Success!" setModalSuccessOpen={setModalSuccessOpen} />
          {setModalSuccessOpen && goBackTable()}
        </>
      )}
    </section>
  );
};

export default ModalAddActivity;
