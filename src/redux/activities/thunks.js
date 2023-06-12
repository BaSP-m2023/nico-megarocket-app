import {
  getActivitiesPending,
  getActivitiesSuccess,
  getActivitiesError,
  deleteActivitiesPending,
  deleteActivitiesSuccess,
  deleteActivitiesError
} from './actions';

export const getAllActivities = async (dispatch) => {
  try {
    dispatch(getActivitiesPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activity`);
    const data = await response.json();
    const activitiesList = data.data;
    dispatch(getActivitiesPending(false));
    dispatch(getActivitiesError(false));
    dispatch(getActivitiesSuccess(activitiesList));
  } catch (error) {
    dispatch(getActivitiesPending(false));
    dispatch(getActivitiesError(true));
  }
};

export const deleteActivity = (activityId) => {
  return async (dispatch) => {
    try {
      dispatch(deleteActivitiesPending(true));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activity/${activityId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        dispatch(deleteActivitiesPending(false));
        dispatch(deleteActivitiesError(false));
        dispatch(deleteActivitiesSuccess(activityId));
      }
    } catch (error) {
      dispatch(deleteActivitiesError(error));
    }
  };
};
