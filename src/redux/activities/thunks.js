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
      const { data } = await response.json();
      dispatch(getActivitiesPending(false));
      dispatch(getActivitiesSuccess(data));
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

export const addActivity = (activity) => {
  return async (dispatch) => {
    try {
      dispatch(addActivitiesPending(true));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(activity)
      });
      if (response.ok) {
        const { data } = await response.json();
        dispatch(addActivitiesSuccess(data));
        dispatch(addActivitiesPending(false));
      } else {
        dispatch(addActivitiesError(true));
        dispatch(addActivitiesPending(false));
      }
    } catch (error) {
      dispatch(addActivitiesPending(false));
      dispatch(addActivitiesError(true));
      console.error(error);
    }
  };
};
