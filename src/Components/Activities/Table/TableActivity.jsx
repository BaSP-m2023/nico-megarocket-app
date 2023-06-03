import style from './tableActivity.module.css';
import ModalAddActivity from '../AddActivity/Index';
import { useState } from 'react';
import { ModalSuccess } from '../../Shared';
import { ModalConfirm } from '../../Shared';

const TableActivity = ({ activity, deleteActivity, setActivity }) => {
  const [modalAdd, setModalAdd] = useState(false);
  const [table, setTable] = useState(true);
  const [editId, setEditId] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editActivities, setEditActivities] = useState({
    name: '',
    description: '',
    isActive: ''
  });
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [getId, setGetId] = useState('');

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

  const findIdEdit = (id) => {
    const findActivity = activity.find((act) => act._id === id);
    setEditActivities({
      name: findActivity.name,
      description: findActivity.description,
      isActive: findActivity.isActive
    });
    setEditId(findActivity._id);
  };

  const editActivity = (id) => {
    const findActivity = activity.find((act) => act._id === id);
    editActivityDB(findActivity._id, editActivities);
    findIdEdit(id);
  };

  const handleEdit = () => {
    setModalAdd(true);
    setTable(false);
  };

  const confirmDelete = () => {
    setModalConfirmOpen(true);
  };

  const deleted = () => {
    deleteActivity(getId);
    setModalConfirmOpen(false);
    setModalSuccessOpen(true);
  };

  return (
    <section className={style.containerTableActivity}>
      {table && (
        <>
          <button
            className={style.addActivityButton}
            onClick={() => {
              setModalAdd(true);
              setTable(false);
            }}
          >
            + Add activity
          </button>
          <table className={style.containerTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Modify</th>
                <th>Delete</th>
              </tr>
            </thead>
            {activity.length < 1 ? (
              <tr>
                <td colSpan="4">This list is empty</td>
              </tr>
            ) : (
              <tbody className={style.containerEachOneActivity}>
                {activity.map((act, index) => (
                  <tr key={index}>
                    <td>{act.name}</td>
                    <td>{act.description}</td>
                    <td>
                      <button className={style.iconsTable}>
                        <img
                          onClick={() => {
                            handleEdit();
                            setEditMode(true);
                            findIdEdit(act._id);
                          }}
                          src={`${process.env.PUBLIC_URL}/assets/images/edit.png`}
                          alt="icon edit"
                        />
                      </button>
                    </td>
                    <td>
                      <button
                        className={style.iconsTable}
                        onClick={() => {
                          confirmDelete();
                          setGetId(act._id);
                        }}
                      >
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/images/trash.png`}
                          alt="icon trash"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </>
      )}
      {modalConfirmOpen && (
        <ModalConfirm
          method="Delete"
          onConfirm={() => {
            deleted();
          }}
          message="Are you sure you want to delete this activity?"
          setModalConfirmOpen={setModalConfirmOpen}
        />
      )}
      {modalSuccessOpen && (
        <ModalSuccess message="Successfully deleted" setModalSuccessOpen={setModalSuccessOpen} />
      )}
      {modalAdd && (
        <ModalAddActivity
          activity={activity}
          setActivity={setActivity}
          setModalAdd={setModalAdd}
          setTable={setTable}
          editActivities={editActivities}
          setEditActivities={setEditActivities}
          editActivity={editActivity}
          editId={editId}
          findIdEdit={findIdEdit}
          editMode={editMode}
        />
      )}
    </section>
  );
};

export default TableActivity;
