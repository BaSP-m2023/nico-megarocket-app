import style from './tableActivity.module.css';
import ModalDelete from '../../Modals/ModalConfirm';
import ModalSuccess from '../../Modals/ModalSuccess';
import { useState } from 'react';

const TableActivity = ({ activity, deleteActivity }) => {
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [getId, setGetId] = useState('');

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
      <button className={style.addActivityButton}>+ Add activity</button>
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
          <div className={style.containerTableEmpty}>
            <div>
              <h3>This list is empty</h3>
            </div>
          </div>
        ) : (
          <tbody className={style.containerEachOneActivity}>
            {activity.map((act, index) => (
              <tr key={index}>
                <td>{act.name}</td>
                <td>{act.description}</td>
                <td>
                  <button className={style.iconsTable}>
                    <img src={`${process.env.PUBLIC_URL}/assets/images/edit.png`} alt="icon edit" />
                  </button>
                </td>
                {modalConfirmOpen && (
                  <ModalDelete
                    method="Delete"
                    onConfirm={() => {
                      deleted();
                    }}
                    message="Do you sure you want delete this activity?"
                    setModalConfirmOpen={setModalConfirmOpen}
                  />
                )}
                {modalSuccessOpen && (
                  <ModalSuccess
                    message="Succesfully deleted"
                    setModalSuccessOpen={setModalSuccessOpen}
                  />
                )}
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
    </section>
  );
};

export default TableActivity;
