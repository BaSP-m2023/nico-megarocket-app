import {
  getActivitiesPending,
  getActivitiesSuccess,
  getActivitiesError,
  deleteActivitiesPending,
  deleteActivitiesSuccess,
  deleteActivitiesError,
  addActivitiesPending,
  addActivitiesSuccess,
  addActivitiesError
} from './actions';

export const getAllActivities = async (dispatch) => {
  try {
    dispatch(getActivitiesPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activity`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data.data;
      console.log(newData);
      dispatch(getActivitiesPending(false));
      dispatch(getActivitiesSuccess(newData));
    } else {
      dispatch(getActivitiesPending(false));
      dispatch(getActivitiesError(true));
    }
  } catch (error) {
    dispatch(getActivitiesPending(false));
    dispatch(getActivitiesError(true));
    console.error(error);
  }
};

export const deleteActivity = (activityId) => {
  return async (dispatch) => {
    try {
      dispatch(deleteActivitiesPending(true));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activity/${activityId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        dispatch(deleteActivitiesPending(false));
        dispatch(deleteActivitiesError(false));
        dispatch(deleteActivitiesSuccess(activityId));
      }
    } catch (error) {
      dispatch(deleteActivitiesPending(false));
      dispatch(deleteActivitiesError(true));
      console.error(error);
    }
  };
};

export const addActivity = async (dispatch, newActivity) => {
  console.log('consolelog3');
  console.log(newActivity, 'LA NEW ACTIVITY');
  try {
    console.log('consolelog3');
    dispatch(addActivitiesPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newActivity)
    });
    if (response.ok) {
      console.log('ifok');
      const data = await response.json();
      const newData = data;
      console.log(newData);
      dispatch(addActivitiesSuccess(newData));
      dispatch(addActivitiesPending(false));
    } else {
      console.log('ifnot');
      dispatch(addActivitiesError(true));
      dispatch(addActivitiesPending(false));
    }
  } catch (error) {
    dispatch(addActivitiesPending(false));
    dispatch(addActivitiesError(true));
    console.error(error);
  }
};
