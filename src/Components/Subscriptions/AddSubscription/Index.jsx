import { useState } from 'react';
import style from './modalAdd.module.css';

const ModalAddSubscription = ({ setModalAdd, setSubscription, setTable }) => {
  const [bodySubscription, setBodySubscription] = useState({
    classes: '',
    member: '',
    date: ''
  });

  const changeInput = (e) => {
    setBodySubscription({
      ...bodySubscription,
      [e.target.name]: e.target.value
    });
  };

  const createSubscriptionDB = async (bodySubscription) => {
    try {
      const newSubscription = await fetch(`${process.env.REACT_APP_API_URL}/subscriptions`, {
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

const addSubscription = async ({ classes, member, date }) => {
  let addedSubscription = {
    classes,
    member,
    date
  };

  const newSubscriptionCreated = await createSubscriptionDB(addedSubscription);
  setSubscription([...addSubscription, newSubscriptionCreated]);
};

const submitSubscription = (e) => {
  e.preventDefault();
  addSubscription(bodySubscription);
  setBodySubscription({
    classes: '',
    member: '',
    date: ''
  });
};

const editSubscription