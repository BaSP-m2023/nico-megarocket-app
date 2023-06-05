import { useState } from 'react';
import style from './modalAdd.module.css';
import { ModalConfirm } from '../../Shared';
import { ModalSuccess } from '../../Shared';
import { Inputs } from '../../Shared';
import { Button } from '../../Shared/index';

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

  const enterForm = () => {
    setModalAdd(false);
    setTable(true);
  };

  return (
    <section className={style.containerModal}>
      <form className={style.containerForm}>
        <h3>Add</h3>
        <Inputs
          nameTitle="Name:"
          type="text"
          text={editMode ? editActivities.name : bodyActivity.name}
          change={editMode ? changeInputEdit : changeInput}
          nameInput="name"
        />
        <Inputs
          nameTitle="Description:"
          type="text"
          text={editMode ? editActivities.description : bodyActivity.description}
          change={editMode ? changeInputEdit : changeInput}
          nameInput="description"
        />
        <Inputs
          nameTitle="Is active:"
          type="text"
          text={editMode ? editActivities.isActive : bodyActivity.isActive}
          change={editMode ? changeInputEdit : changeInput}
          nameInput="isActive"
        />
        <div className={style.containerAddButton}>
          <Button clickAction={enterForm} text="Cancel" />
          <Button clickAction={handleConfirmEdit} text="Save" disabled={active} />
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
