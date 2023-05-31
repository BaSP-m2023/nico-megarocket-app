import style from './TableSubscriptions.module.css';
import { useState } from 'react';
import ModalAddSubscription from '../AddSubscription/Index';

const TableSubscriptions = ({ subscription, deleteSubscription, setSubscription }) => {
  const [modalAdd, setModalAdd] = useState(false);
  const [table, setTable] = useState(true);
  const [editId, setEditId] = useState('');
  const [editMode, setEditMode] = useState(false);

  const [editSubscriptions, setEditSubscriptions] = useState({
    classes: '',
    member: '',
    date: ''
  });

  const editSubscriptionDB = async (id, editSubscriptions) => {
    try {
      let subscriptionUpdated = await fetch(
        `${process.env.REACT_APP_API_URL}/subscriptions/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(editSubscriptions)
        }
      );
      console.log(subscriptionUpdated);
      return subscriptionUpdated.json();
    } catch (error) {
      console.error(error);
    }
  };

  const findIdEdit = (id) => {
    const findSubscription = subscription.find((sub) => sub._id === id);
    setEditSubscriptions({
      classes: findSubscription.classes,
      member: findSubscription.member,
      date: findSubscription.date
    });
    setEditId(findSubscription._id);
  };

  const editSubscription = (id) => {
    const findSubscription = subscription.find((sub) => sub._id === id);
    editSubscriptionDB(findSubscription._id, editSubscriptions);
    findIdEdit(id);
  };

  return (
    <>
      {table && (
        <>
          <button
            className={style.addButton}
            onClick={() => {
              setModalAdd(true);
              setTable(false);
            }}
          >
            Add subscription
          </button>
          <table className={style.containerTable}>
            <thead>
              <tr>
                <th>Classes</th>
                <th>Member</th>
                <th>Date</th>
                <th>Modify</th>
                <th>Delete</th>
              </tr>
            </thead>
            {subscription.length < 1 ? (
              <tbody>
                <tr>
                  <div className={style.containerEmpty}>
                    <div>
                      <h3>This is empty</h3>
                    </div>
                  </div>
                </tr>
              </tbody>
            ) : (
              <tbody className={style.containerEachSubscription}>
                {subscription.map((sub, index) => (
                  <tr key={index}>
                    <td>{sub.classes}</td>
                    <td>{sub.member}</td>
                    <td>{sub.date}</td>
                    <td>
                      <button className={style.tableIcons}>
                        <img
                          src={`${process.env.PUBLIC_URL}assets/images/pencil-edit.svg`}
                          alt="edit icon"
                        />
                      </button>
                    </td>
                    <td>
                      <button
                        className={style.tableIcons}
                        onClick={() => deleteSubscription(sub._id)}
                      >
                        <img
                          src={`${process.env.PUBLIC_URL}assets/images/trash-delete.svg`}
                          alt="trash can icon"
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
      {modalAdd && (
        <ModalAddSubscription
          subscription={subscription}
          setSubscription={setSubscription}
          setModalAdd={setModalAdd}
          setTable={setTable}
          editSubscriptions={editSubscriptions}
          setEditSubscriptions={setEditSubscriptions}
          editSubscription={editSubscription}
          editId={editId}
          findIdEdit={findIdEdit}
          editMode={editMode}
        />
      )}
    </>
  );
};

export default TableSubscriptions;
