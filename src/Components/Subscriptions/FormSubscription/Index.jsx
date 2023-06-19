import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Inputs, Button, ModalConfirm, ModalSuccess, OptionInput } from '../../Shared';
import style from '../FormSubscription/modalAdd.module.css';
import {
  addSubscriptions,
  updateSubscriptions,
  getSuscription
} from '../../../redux/subscriptions/thunks';
import { getClasses } from '../../../redux/classes/thunks';
import { getAllMembers } from '../../../redux/members/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
/* import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi'; */

const FormSubscription = () => {
  const dispatch = useDispatch();
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [subscription, setSubscription] = useState({});

  const history = useHistory();
  const { id } = useParams();
  const classes = useSelector((state) => state.classes.list);
  const members = useSelector((state) => state.members.list);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur'
  });

  useEffect(() => {
    getSuscription(dispatch);
    getClasses(dispatch);
    getAllMembers(dispatch);
  }, []);

  const onConfirm = () => {
    if (!id) {
      addSubscriptions(dispatch, subscription);
    } else {
      updateSubscriptions(dispatch, id, subscription);
    }
  };

  const returnToTable = () => {
    setTimeout(() => {
      history.push('/admin/subscriptions');
    }, 1000);
  };

  const goBack = () => {
    history.goBack();
  };

  const onSubmit = (data) => {
    const newSub = {
      classId: data.classId,
      members: data.members,
      date: data.date
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
          <Button clickAction={goBack} text="Cancel" />
          <Button clickAction={() => reset()} text="Reset" />
          <Button clickAction={() => {}} text="Save" />
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
        <>
          <ModalSuccess message="Success!" setModalSuccessOpen={setModalSuccessOpen} />
          {setModalSuccessOpen && returnToTable()}
        </>
      )}
    </section>
  );
};
export default FormSubscription;
