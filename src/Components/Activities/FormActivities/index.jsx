import { useState, useEffect } from 'react';
import style from './modalAdd.module.css';
import { ModalConfirm, ModalSuccess, Inputs } from '../../Shared';
import { Button } from '../../Shared/index';
import { useHistory, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';

const ModalAddActivity = () => {
  const [active, setActive] = useState(true);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [bodyActivity, setBodyActivity] = useState({
    name: '',
    description: '',
    isActive: ''
  });

  const [activitiesEdit, setEditActivities] = useState({
    name: '',
    description: '',
    isActive: ''
  });

  const history = useHistory();
  const dataEdit = useLocation();

  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      setBodyActivity({
        name: '',
        description: '',
        isActive: ''
      });
    } else {
      const activitiesEdited = dataEdit.state.params;
      setEditActivities({
        name: activitiesEdited.name,
        description: activitiesEdited.description,
        isActive: activitiesEdited.isActive
      });
    }
  }, []);

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
      ...activitiesEdit,
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

  const editActivityDB = async (id, editActivities) => {
    try {
      let activityEdited = await fetch(`${process.env.REACT_APP_API_URL}/activity/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editActivities)
      });
      return activityEdited.json();
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
    await createActivityDB(newActivity);
  };

  const submitActivity = () => {
    addActivity(bodyActivity);
    setModalConfirmOpen(false);
    setModalSuccessOpen(true);
  };

  const submitEdited = (id, activitiesEd) => {
    editActivityDB(id, activitiesEd);
    setModalConfirmOpen(false);
    setModalSuccessOpen(true);
  };

  const handleConfirmEdit = (e) => {
    e.preventDefault();
    setModalConfirmOpen(true);
  };

  const goBackTable = () => {
    setTimeout(() => {
      history.push('/activities');
    }, 1000);
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <section className={style.containerModal}>
      <form className={style.containerForm}>
        <h3>Add</h3>
        <Inputs
          nameTitle="Name:"
          type="text"
          text={id ? activitiesEdit.name : bodyActivity.name}
          change={id ? changeInputEdit : changeInput}
          nameInput="name"
        />
        <Inputs
          nameTitle="Description:"
          type="text"
          text={id ? activitiesEdit.description : bodyActivity.description}
          change={id ? changeInputEdit : changeInput}
          nameInput="description"
        />
        <Inputs
          nameTitle="Is active:"
          type="text"
          text={id ? activitiesEdit.isActive : bodyActivity.isActive}
          change={id ? changeInputEdit : changeInput}
          nameInput="isActive"
        />
        <div className={style.containerAddButton}>
          <Button clickAction={goBack} text="Cancel" />
          <Button clickAction={handleConfirmEdit} text="Save" disabled={active} />
        </div>
      </form>
      {modalConfirmOpen && (
        <ModalConfirm
          method="Confirm"
          onConfirm={() => {
            !id ? submitActivity() : submitEdited(id, activitiesEdit);
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
