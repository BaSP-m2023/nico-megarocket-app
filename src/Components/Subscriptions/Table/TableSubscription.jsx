const TableSubscriptions = ({ subscription, deleteSubscription }) => {
  return (
    <div>
      <div>
        <button>Add subscription</button>
      </div>
      {subscription.length < 1 ? (
        <section>
          <div>
            <h3>This is empty</h3>
          </div>
        </section>
      ) : (
        subscription.map((sub, index) => {
          return (
            <div key={index}>
              <div>
                <p>{sub.name}</p>
                <p>{sub.description}</p>
              </div>
              <div>
                <img
                  src={`${process.env.PUBLIC_URL}public/assets/images/pencil-edit.svg`}
                  height="20px"
                  width="20px"
                  alt="edit icon"
                />
                <img
                  src={`${process.env.PUBLIC_URL}public/assets/images/trash-delete.svg`}
                  height="20px"
                  width="20px"
                  alt="trash can icon"
                  onClick={() => deleteSubscription(sub._id)}
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TableSubscriptions;
