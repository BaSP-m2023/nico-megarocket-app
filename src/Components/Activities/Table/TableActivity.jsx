import style from './tableActivity.module.css';

const TableActivity = ({ activity, deleteActivity }) => {
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
                <td>
                  <button className={style.iconsTable} onClick={() => deleteActivity(act._id)}>
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
