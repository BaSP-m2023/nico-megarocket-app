import { useState, useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import {
  Inputs,
  Button,
  ModalConfirm,
  ModalSuccess,
  OptionInput,
  OptionMultipleInput,
  ToastError,
  Loader
} from 'Components/Shared';
import style from '../FormSubscription/modalAdd.module.css';
import { addSubscriptions, updateSubscriptions, getSuscription } from 'redux/subscriptions/thunks';
import { getClasses, updateClass } from 'redux/classes/thunks';
import { getAllMembers } from 'redux/members/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const FormSubscription = () => {
  const dispatch = useDispatch();
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [toastError, setModalError] = useState(false);
  const [membersSelected, setMembersSelected] = useState([]);
  const [subscription, setSubscription] = useState({});
  const [searchMember, setSearchMember] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [slots, setSlots] = useState(0);
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();
  const classes = useSelector((state) => state.classes.list);
  const subscriptions = useSelector((state) => state.subscription.data);
  const members = useSelector((state) => state.members.list);
  const isPending = useSelector((state) => state.subscription.pending);
  const data = location.state.params;

  const membersActive = members.filter((member) => {
    return member.isActive === true;
  });

  const membersInput =
    searchMember.length > 0
      ? membersActive.filter((member) => {
          return member.firstName.toLowerCase().includes(searchMember.toLowerCase());
        })
      : membersActive;

  const schema = Joi.object({
    date: Joi.date().required().messages({
      'date.base': 'Date must be a valid date',
      'any.required': 'Date is required'
    }),
    members: Joi.alternatives()
      .try(
        Joi.array().items(Joi.string().hex().length(24).required()).min(1),
        Joi.string().hex().length(24).required()
      )
      .required()
      .messages({
        'any.only': 'Please select a member',
        'any.required': 'Please select a member',
        'array.min': 'Please select at least one member'
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
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: { ...subscriptionUpdated }
  });

  useEffect(() => {
    if (!isPending) {
      setShowLoader(true);
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPending]);

  const subscriptionClassIds = subscriptions.map((subs) => subs.classId);

  const unSubscribedClasses = classes.filter((classItem) => {
    return !subscriptionClassIds.find((classId) => classId._id === classItem._id);
  });

  const selectedClass = classes.find((oneClass) => oneClass._id === watch('classId'));
  const isSlotsAvailable = selectedClass && slots > 0;

  const handleClick = () => {
    history.push(`/admin/classes/ClassForm/${selectedClass._id}`, {
      params: { ...selectedClass, mode: 'edit' }
    });
  };

  const onConfirm = async () => {
    if (!id) {
      const updatedClass = {
        slots: slots
      };
      const body = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedClass)
      };

      await dispatch(updateClass(selectedClass._id, body));
      const addSubscriptionResponse = await addSubscriptions(dispatch, subscription);
      if (addSubscriptionResponse.type === 'POST_SUBSCRIPTION_SUCCESS') {
        setModalSuccessOpen(true);
        return setTimeout(() => {
          history.goBack();
        }, 1000);
      }
    } else {
      const updatedClass = {
        slots: slots
      };
      const body = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedClass)
      };

      await dispatch(updateClass(selectedClass._id, body));
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
    if (!membersSelected.length) {
      setModalError(true);
    } else {
      const newSub = {
        classId: newData.classId,
        members: membersSelected,
        date: newData.date
      };
      setModalConfirmOpen(true);
      setSubscription(newSub);
    }
  };

  const handleMiembroClick = (event) => {
    const value = event.target.value;

    if (membersSelected.includes(value)) {
      setMembersSelected(membersSelected.filter((member) => member !== value));
      setSlots(slots + 1);
    } else {
      setSlots(slots - 1);
      setMembersSelected([...membersSelected, value]);
    }
  };

  const deleteItemList = (member) => {
    setSlots(slots + 1);
    setMembersSelected(membersSelected.filter((oneMember) => oneMember !== member));
  };

  useEffect(() => {
    getSuscription(dispatch);
    getClasses(dispatch);
    getAllMembers(dispatch);
    if (data.members) {
      const membersInSubs = data.members.map((member) => member._id);
      setMembersSelected(membersInSubs);
    }
  }, []);

  useEffect(() => {
    setSlots(selectedClass.slots);
  }, [classes]);

  const [selectedLi, setSelectedLi] = useState(null);

  const handleIconClick = (memberId) => {
    setSelectedLi(memberId);
  };
  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <section className={style.containerModal}>
          <form className={style.containerForm} onSubmit={handleSubmit(onSubmit)}>
            <h3>{id ? 'Edit subscription' : 'Add subscription'}</h3>
            <div className={style.inputMemberContainer}>
              {id ? (
                <>
                  <div className={id ? style.hidden : ''}>
                    <OptionInput
                      data={unSubscribedClasses}
                      dataLabel="Class"
                      setValue={{}}
                      aValue={{}}
                      name="classId"
                      register={register}
                      error={errors.classId?.message}
                    />
                  </div>
                  <p className={id ? style.formEdited : style.hidden}>
                    {selectedClass.activity?.name} - {selectedClass?.hour}
                    <img
                      className={style.icon}
                      onClick={() => handleClick()}
                      src={`${process.env.PUBLIC_URL}/assets/images/pencil-edit.svg`}
                    />
                  </p>
                </>
              ) : (
                <OptionInput
                  data={unSubscribedClasses}
                  dataLabel="Class"
                  setValue={{}}
                  aValue={{}}
                  name="classId"
                  register={register}
                  error={errors.classId?.message}
                />
              )}
              {selectedClass && (
                <>
                  {slots <= 0 ? (
                    <p className={style.slots}>No slots available</p>
                  ) : (
                    <p className={style.slots}>Slots: {slots}</p>
                  )}
                </>
              )}
            </div>
            <div className={style.inputContainer}>
              Members:
              <input
                className={style.searchInput}
                type="text"
                placeholder="Search Member..."
                onChange={(e) => setSearchMember(e.target.value)}
              />
              <OptionMultipleInput
                membersSelected={membersSelected.length === 0 ? '' : membersSelected}
                onAction={handleMiembroClick}
                data={membersInput}
                dataLabel="Member"
                setValue={{}}
                aValue={{}}
                name="members"
                register={register}
                error={errors.members?.message}
                disabled={!isSlotsAvailable}
              />
            </div>
            <ul className={style.list}>
              {membersSelected.map((member) => {
                {
                  return members.map((oneMember) => {
                    if (oneMember._id === member) {
                      return (
                        <li key={member}>
                          <div className={style.listMembers}>
                            <div className={style.eachMember}>
                              {oneMember.firstName} {oneMember.lastName}
                              <div className={style.boxClose}>
                                <img
                                  className={style.iconPic}
                                  onClick={() => {
                                    handleIconClick(member);
                                  }}
                                  src={`${process.env.PUBLIC_URL}/assets/images/${'info.png'}`}
                                />
                                <div
                                  onClick={() => deleteItemList(member)}
                                  className={style.close_icon}
                                />
                              </div>
                            </div>
                          </div>
                          {selectedLi === member && (
                            <div className={style.speechBalloon}>
                              <div className={style.speechElements}>
                                <p title={'Email'}>{oneMember.email}</p>
                                <p title={'Dni'}>{oneMember.dni}</p>
                                <div
                                  onClick={() => {
                                    setSelectedLi(null);
                                  }}
                                  className={`${style.boxClick} ${style.close_icon}`}
                                />
                              </div>
                            </div>
                          )}
                        </li>
                      );
                    }
                    return null;
                  });
                }
              })}
            </ul>
            <Inputs
              nameTitle="Date:"
              nameInput="date"
              type="date"
              register={register}
              error={errors.date?.message}
            />
            <div className={style.containerAdd}>
              <Button clickAction={() => {}} text={id ? 'Save' : 'Add'} />
              <Button clickAction={() => reset()} text="Reset" />
              <Button clickAction={goBack} text="Cancel" />
            </div>
          </form>
          {modalConfirmOpen && (
            <ModalConfirm
              method="Confirm"
              onConfirm={onConfirm}
              message="Are you sure you want to update this subscription?"
              setModalConfirmOpen={setModalConfirmOpen}
            />
          )}
          {modalSuccessOpen && (
            <ModalSuccess
              message="Subscription has been updated succesfully"
              setModalSuccessOpen={setModalSuccessOpen}
            />
          )}
          {toastError && (
            <ToastError setToastErroOpen={setModalError} message="Pick at least one member" />
          )}
        </section>
      )}
    </>
  );
};
export default FormSubscription;
