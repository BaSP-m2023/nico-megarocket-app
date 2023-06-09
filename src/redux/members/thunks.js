import { getMembers, deleteMember } from './actions';

export const getAllMembers = async (dispatch) => {
  try {
    const reponse = await fetch(`${process.env.REACT_APP_API_URL}/api/member`);
    const data = await reponse.json();
    const membersPrueba = data.data;
    dispatch(getMembers(membersPrueba));
  } catch (error) {
    throw new Error(error);
  }
};

export const memberDelete = async (dispatch, memberID) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${memberID}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      dispatch(deleteMember(memberID));
    } else {
      throw new Error('Failed to delete member');
    }
  } catch (error) {
    throw new Error(error);
  }
};
