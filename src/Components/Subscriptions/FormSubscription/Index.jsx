import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Inputs, Button, ModalConfirm, ModalSuccess } from '../../Shared';
import style from '../FormSubscription/modalAdd.module.css';
import {
  addSubscriptions,
  updateSubscriptions,
  getSuscription
} from '../../../redux/subscriptions/thunks';
import { useDispatch, useSelector } from 'react-redux';

const FormSubscription = () => {
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(true);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [bodySubscription, setBodySubscription] = useState({
    classId: '',
    members: [],
    date: ''
  });

  const [subscriptionEdit, setEditSubscriptions] = useState({
    classId: '',
    members: [],
    date: ''
  });

  const history = useHistory();
  const { id } = useParams();
  const data = useSelector((state) => state.subscription.data);

  useEffect(() => {
    getSuscription(dispatch);
    if (!id) {
      setBodySubscription({
        classId: '',
        members: [],
        date: ''
      });
    } else {
      const subEdit = data.find((sub) => sub._id === id);
      setEditSubscriptions({
        classId: subEdit?.classId ? subEdit?.classId._id : '',
        members: subEdit?.members
          ? subEdit?.members.map((member) => {
              return member._id;
            })
          : '',
        date: subEdit?.date
      });
    }
  }, [data.length === 0]);

  const changeInput = (e) => {
    setBodySubscription({ ...bodySubscription, [e.target.name]: e.target.value });
    const validFields = Object.values(bodySubscription).every((field) => {
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

  const createSubscriptionDB = async () => {
    const newSub = {
      classId: bodySubscription.classId,
      members: [bodySubscription.members],
      date: bodySubscription.date
    };
    try {
      addSubscriptions(dispatch, newSub);
    } catch (error) {
      console.error(error);
    }
  };

  const submitSubscription = () => {
    setModalConfirmOpen(false);
    setModalSuccessOpen(true);
    createSubscriptionDB();
  };

  const submitEditedSubscription = (id, subscriptionsEdition) => {
    const editedSub = {
      classId: subscriptionsEdition.classId,
      members: subscriptionsEdition.members,
      date: subscriptionsEdition.date
    };
    updateSubscriptions(dispatch, id, editedSub);
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
        <h3>{id ? 'Edit subscription' : 'Add subscription'}</h3>
        <Inputs
          nameTitle="Class:"
          type="text"
          nameInput="classId"
          change={id ? changeInputEdit : changeInput}
          text={id ? subscriptionEdit.classId : bodySubscription.classId}
        />
        <Inputs
          nameTitle="Member:"
          type="text"
          text={id ? subscriptionEdit.members : bodySubscription.members}
          nameInput="members"
          change={id ? changeInputEdit : changeInput}
        />
        <Inputs
          nameTitle="Date:"
          type="date"
          text={id ? subscriptionEdit.date : bodySubscription.date}
          nameInput="date"
          change={id ? changeInputEdit : changeInput}
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
export default FormSubscription;
