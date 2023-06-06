import styles from './tableActivity.module.css';
import { useState } from 'react';
import { ModalSuccess, ModalConfirm, TableComponent } from '../../Shared';
import ModalAddActivity from '../AddActivity/Index';

const TableActivity = ({ activity, deleteActivity, setActivity }) => {
  const [modalAdd, setModalAdd] = useState(false);
  const [table, setTable] = useState(true);
  const [editId, setEditId] = useState('');
  const [editMode] = useState(false);
  const [editActivities, setEditActivities] = useState({
    name: '',
    description: '',
    isActive: ''
  });
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [getId] = useState('');

  const editActivityDB = async (id, editActivities) => {
    try {
      let activityEdited = await fetch(`${process.env.REACT_APP_API_URL}/api/activity/${id}`, {
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

  const columnTitleArray = ['Name', 'Description'];
  const columns = ['name', 'description'];

  return (
    <section className={styles.containerTableActivity}>
      {table && (
        <>
          <button
            className={styles.addActivityButton}
            onClick={() => {
              setModalAdd(true);
              setTable(false);
            }}
          >
            + Add activity
          </button>
          <TableComponent
            columnTitleArray={columnTitleArray}
            data={activity}
            editButton={handleEdit}
            deleteButton={confirmDelete}
            columns={columns}
            valueField={{
              arrayFirstValue: 'name',
              arraySecondValue: 'description',
              objectValue: 'description'
            }}
            arrayAndObject={null}
            autoDelete={() => {}}
          />
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
