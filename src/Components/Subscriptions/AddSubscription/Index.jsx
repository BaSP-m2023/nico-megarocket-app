import { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Inputs, Button, ModalConfirm, ModalSuccess } from '../../Shared';
import style from '../AddSubscription/modalAdd.module.css';

const ModalAddSubscription = () => {
  const [isValid, setIsValid] = useState(true);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [bodySubscription, setBodySubscription] = useState({
    classes: '',
    member: '',
    date: ''
  });

  const [subscriptionEdit, setEditSubscriptions] = useState({
    classes: '',
    member: '',
    date: ''
  });

  const history = useHistory();
  const editData = useLocation();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      setBodySubscription({
        classes: '',
        member: '',
        date: ''
      });
    } else {
      const subscriptionEdited = editData.state.params;
      setEditSubscriptions({
        classes: subscriptionEdited.classes,
        member: subscriptionEdited.member,
        date: subscriptionEdited.date
      });
    }
  }, [editData, id]);

  const changeInput = (e) => {
    const veryNewSubscription = { ...bodySubscription, [e.target.name]: e.target.value };
    setBodySubscription(veryNewSubscription);

    const validFields = Object.values(veryNewSubscription).every((field) => {
      return field.length >= 3 && field !== '';
    });

    setIsValid(!validFields);
  };

  const changeInputEdit = (e) => {
    setEditSubscriptions({
      ...subscriptionEdit,
      [e.target.name]: e.target.value
    });

    if (e.target.value.length >= 3) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const createSubscriptionDB = async (bodySubscription) => {
    try {
      const newSubscription = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(bodySubscription)
      });
      return newSubscription.json();
    } catch (error) {
      console.error(error);
    }
  };

  const editSubscriptionsDB = async (id, subscriptionEdit) => {
    try {
      let subscriptionEdited = await fetch(`${process.env.REACT_APP_API_URL}/activity/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(subscriptionEdit)
      });
      return subscriptionEdited.json();
    } catch (error) {
      console.error(error);
    }
  };

  const addSubscription = async ({ classes, member, date }) => {
    let veryNewSubscription = {
      classes,
      member,
      date
    };

    await createSubscriptionDB(veryNewSubscription);
  };

  const submitSubscription = () => {
    addSubscription(bodySubscription);
    setModalConfirmOpen(false);
    setModalSuccessOpen(true);
  };

  const submitEditedSubscription = (id, subscriptionsEdition) => {
    editSubscriptionsDB(id, subscriptionsEdition);
    setModalConfirmOpen(false);
    setModalSuccessOpen(true);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setModalConfirmOpen(true);
  };

  const returnToTable = () => {
    setTimeout(() => {
      history.push('/subscriptions');
    }, 1000);
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <section className={style.containerModal}>
      <form className={style.containerForm}>
        <h3>Add subscription</h3>
        <Inputs
          nameTitle="Class:"
          type="text"
          value={id ? subscriptionEdit.classes : bodySubscription.classes}
          name="classes"
          onChange={id ? changeInputEdit : changeInput}
        />
        <Inputs
          nameTitle="Member:"
          type="text"
          value={id ? subscriptionEdit.member : bodySubscription.member}
          name="member"
          onChange={id ? changeInputEdit : changeInput}
        />
        <Inputs
          nameTitle="Date:"
          type="date"
          value={id ? subscriptionEdit.date : bodySubscription.date}
          name="date"
          onChange={id ? changeInputEdit : changeInput}
        />
        <div className={style.containerAdd}>
          <Button clickAction={goBack} text="Cancel" />
          <Button clickAction={handleClick} text="Save" disabled={!isValid} />
        </div>
      </form>
      {modalConfirmOpen && (
        <ModalConfirm
          method="Confirm"
          onConfirm={() => {
            !id ? submitSubscription() : submitEditedSubscription(id, subscriptionEdit);
          }}
          message="Are you sure?"
          setModalConfirmOpen={setModalConfirmOpen}
        />
      )}
      {modalSuccessOpen && (
        <>
          <ModalSuccess message="Success!" setModalSuccessOpen={setModalSuccessOpen} />
          {setModalSuccessOpen && returnToTable()}
        </>
      )}
    </section>
  );
};

export default ModalAddSubscription;
