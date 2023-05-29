import style from './tableActivity.module.css';

const TableActivity = ({ activity, deleteActivity }) => {
  return (
    <div className={style.container}>
      <div>
        <button>+ Add activity</button>
      </div>
      {activity.length < 1 ? (
        <section className={style.containerListEmpty}>
          <div>
            <h3>This list is empty</h3>
          </div>
        </section>
      ) : (
        <div className={style.containerOneActivity}>
          {activity.map((act, index) => {
            return (
              <div key={index} className={style.containerEachActivity}>
                <div className={style.containerNameDescription}>
                  <p>{act.name}</p>
                  <p>{act.description}</p>
                </div>
                <div className={style.containerIcons}>
                  <img src={`${process.env.PUBLIC_URL}/assets/images/edit.png`} alt="icon edit" />
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/trash.png`}
                    alt="icon trash"
                    onClick={() => deleteActivity(act._id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
      ;
    </div>
  );
};

export default TableActivity;
