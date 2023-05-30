import { useState } from 'react';
import style from './modalAdd.module.css';

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
  const [bodyActivity, setBodyActivity] = useState({
    name: '',
    description: '',
    isActive: ''
  });

  const changeInput = (e) => {
    setBodyActivity({
      ...bodyActivity,
      [e.target.name]: e.target.value
    });

    const allFieldsValid = Object.values(bodyActivity).every((field) => field.length >= 3);

    setActive(!allFieldsValid);
  };

  const changeInputEdit = (e) => {
    setEditActivities({
      name: bodyActivity.name || editActivities.name,
      description: bodyActivity.description || editActivities.description,
      isActive: bodyActivity.isActive || editActivities.isActive,

      [e.target.name]: e.target.value
    });

    const allFieldsValid = Object.values(editActivities).every((field) => field.length >= 3);

    setActive(!allFieldsValid);
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

  const submitActivity = (e) => {
    e.preventDefault();
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
  };

  return (
    <section className={style.containerModal}>
      <form onSubmit={submitActivity} className={style.containerForm}>
        <h3>Add</h3>
        <div>
          <label>Name:</label>
          {editMode ? (
            <input type="text" value={editActivities.name} name="name" onChange={changeInputEdit} />
          ) : (
            <input type="text" value={bodyActivity.name} name="name" onChange={changeInput} />
          )}
        </div>
        <div>
          <label>Description:</label>
          {editMode ? (
            <input
              type="text"
              value={editActivities.description}
              name="description"
              onChange={changeInputEdit}
            />
          ) : (
            <input
              type="text"
              value={bodyActivity.description}
              name="description"
              onChange={changeInput}
            />
          )}
        </div>
        <div>
          <label>isActive</label>
          {editMode ? (
            <input
              type="text"
              value={editActivities.isActive}
              name="isActive"
              onChange={changeInputEdit}
            />
          ) : (
            <input
              type="text"
              value={bodyActivity.isActive}
              name="isActive"
              onChange={changeInput}
            />
          )}
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
    </section>
  );
};

export default ModalAddActivity;
