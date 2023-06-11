import { getActivitiesPending, getActivitiesSuccess, getActivitiesError } from './actions';

export const getAllActivities = async (dispatch) => {
  try {
    dispatch(getActivitiesPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`);
    const data = await response.json();
    const activitiesList = data.data;
    dispatch(getActivitiesPending(false));
    dispatch(getActivitiesSuccess(activitiesList));
  } catch (error) {
    dispatch(getActivitiesPending(false));
    dispatch(getActivitiesError(true));
  }
};
