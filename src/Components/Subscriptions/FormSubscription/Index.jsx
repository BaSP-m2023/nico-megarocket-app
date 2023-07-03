import { useState, useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { Inputs, Button, ModalConfirm, ModalSuccess, OptionInput } from 'Components/Shared';
import style from '../FormSubscription/modalAdd.module.css';
import { addSubscriptions, updateSubscriptions, getSuscription } from 'redux/subscriptions/thunks';
import { getClasses } from 'redux/classes/thunks';
import { getAllMembers } from 'redux/members/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const FormSubscription = () => {
  const dispatch = useDispatch();
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [subscription, setSubscription] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();
  const classes = useSelector((state) => state.classes.list);
  const members = useSelector((state) => state.members.list);
  const data = location.state.params;

  const schema = Joi.object({
    date: Joi.date().required().messages({
      'date.base': 'Date must be a valid date',
      'any.required': 'Date is required'
    }),
    members: Joi.alternatives()
      .try(
        Joi.array().items(Joi.string().hex().length(24).required()),
        Joi.string().hex().length(24).required()
      )
      .required()
      .messages({
        'any.only': 'Please select a member',
        'any.required': 'Please select a member'
      }),
    classId: Joi.string().required().invalid('Pick classId').messages({
      'any.only': 'Please select a class'
    })
  });

  const subscriptionUpdated = {
    classId: data.classId?._id,
    members: data.members?.map((member) => member._id),
    date: data.date && new Date(data.date).toISOString().substr(0, 10)
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: { ...subscriptionUpdated }
  });

  useEffect(() => {
    getSuscription(dispatch);
    getClasses(dispatch);
    getAllMembers(dispatch);
  }, []);

  const onConfirm = async () => {
    if (!id) {
      const addSubscriptionResponse = await addSubscriptions(dispatch, subscription);
      if (addSubscriptionResponse.type === 'POST_SUBSCRIPTION_SUCCESS') {
        setModalSuccessOpen(true);
        return setTimeout(() => {
          history.goBack();
        }, 1000);
      }
    } else {
      const editSubscriptionResponse = await dispatch(updateSubscriptions(id, subscription));
      if (editSubscriptionResponse.type === 'PUT_SUBSCRIPTION_SUCCESS') {
        setModalSuccessOpen(true);
        return setTimeout(() => {
          history.goBack();
        }, 1000);
      }
    }
  };

  const goBack = () => {
    history.goBack();
  };

  const onSubmit = (newData) => {
    const newSub = {
      classId: newData.classId,
      members: [newData.members],
      date: newData.date
    };
    setModalConfirmOpen(true);
    setSubscription(newSub);
  };

  return (
    <section className={style.containerModal}>
      <form className={style.containerForm} onSubmit={handleSubmit(onSubmit)}>
        <h3>{id ? 'Edit subscription' : 'Add subscription'}</h3>
        <OptionInput
          data={classes}
          dataLabel="Class"
          setValue={{}}
          aValue={{}}
          name="classId"
          register={register}
          error={errors.classId?.message}
        />
        <OptionInput
          data={members}
          dataLabel="Member"
          setValue={{}}
          aValue={{}}
          name="members"
          register={register}
          error={errors.members?.message}
        />
        <Inputs
          nameTitle="Date:"
          nameInput="date"
          type="date"
          register={register}
          error={errors.date?.message}
        />
        <div className={style.containerAdd}>
          <Button clickAction={() => {}} text="Save" />
          <Button clickAction={() => reset()} text="Reset" />
          <Button clickAction={goBack} text="Cancel" />
        </div>
      </form>
      {modalConfirmOpen && (
        <ModalConfirm
          method="Confirm"
          onConfirm={onConfirm}
          message="Are you sure?"
          setModalConfirmOpen={setModalConfirmOpen}
        />
      )}
      {modalSuccessOpen && (
        <ModalSuccess message="Success!" setModalSuccessOpen={setModalSuccessOpen} />
      )}
    </section>
  );
};
export default FormSubscription;
