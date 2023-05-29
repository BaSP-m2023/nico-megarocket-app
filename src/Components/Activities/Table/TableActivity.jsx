const TableActivity = ({ activity, deleteActivity }) => {
  return (
    <div>
      <div>
        <button>+ Add activity</button>
      </div>
      {activity.length < 1 ? (
        <section>
          <div>
            <h3>This list is empty</h3>
          </div>
        </section>
      ) : (
        activity.map((act, index) => {
          return (
            <div key={index}>
              <div>
                <p>{act.name}</p>
                <p>{act.description}</p>
              </div>
              <div>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/edit.png`}
                  width="20px"
                  height="20px"
                  alt="icon edit"
                />
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/trash.png`}
                  width="20px"
                  height="20px"
                  alt="icon trash"
                  onClick={() => deleteActivity(act._id)}
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TableActivity;
