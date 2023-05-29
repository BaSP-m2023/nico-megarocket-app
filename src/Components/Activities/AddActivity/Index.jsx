import { useState } from 'react';
import style from './modalAdd.module.css';

const ModalAddActivity = ({ setModalAdd, activity, setActivity, setTable }) => {
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
    addActivity(bodyActivity);
    setBodyActivity({
      name: '',
      description: '',
      isActive: ''
    });
  };

  // eslint-disable-next-line no-unused-vars
  const editActivity = (id) => {
    const findActivity = bodyActivity.find((act) => act._id === id);

    findActivity.name = findActivity.name || bodyActivity.name;
    findActivity.description = findActivity.description || bodyActivity.description;
    findActivity.isActive = findActivity.isActive || bodyActivity.isActive;
  };

  return (
    <section className={style.containerModal}>
      <form onSubmit={submitActivity} className={style.containerForm}>
        <h3>Add</h3>
        <div>
          <label>Name:</label>
          <input type="text" value={bodyActivity.name} name="name" onChange={changeInput} />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={bodyActivity.description}
            name="description"
            onChange={changeInput}
          />
        </div>
        <div>
          <label>isActive</label>
          <input type="text" value={bodyActivity.isActive} name="isActive" onChange={changeInput} />
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
          <button>Save</button>
        </div>
      </form>
    </section>
  );
};

export default ModalAddActivity;
