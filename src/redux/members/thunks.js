import {
  getMembersPending,
  getMembersSuccess,
  getMembersError,
  deleteMemberPending,
  deleteMemberSuccess,
  deleteMemberError
} from './actions';

export const getAllMembers = async (dispatch) => {
  try {
    dispatch(getMembersPending(true));
    const reponse = await fetch(`${process.env.REACT_APP_API_URL}/api/member`);
    const data = await reponse.json();
    const membersList = data.data;
    dispatch(getMembersPending(false));
    dispatch(getMembersSuccess(membersList));
  } catch (error) {
    dispatch(getMembersPending(false));
    dispatch(getMembersError(true));
  }
};

export const memberDelete = async (dispatch, memberID) => {
  try {
    dispatch(deleteMemberPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${memberID}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      dispatch(deleteMemberPending(false));
      dispatch(deleteMemberSuccess(memberID));
    }
  } catch (error) {
    dispatch(deleteMemberError(error));
  }
};
