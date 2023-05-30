import style from './TableSubscriptions.module.css';

const TableSubscriptions = ({ subscription, deleteSubscription }) => {
  return (
    <section className={style.containerTableSubscription}>
      <button className={style.addButton}>Add subscription</button>
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
          <div className={style.containerEmpty}>
            <div>
              <h3>This is empty</h3>
            </div>
          </div>
        ) : (
          <tbody className={style.containerEachSubscription}>
            {subscription.map((sub, index) => {
              return (
                <tr key={index}>
                  <td>{sub.name}</td>
                  <td>{sub.description}</td>
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
              );
            })}
          </tbody>
        )}
      </table>
    </section>
  );
};

export default TableSubscriptions;
