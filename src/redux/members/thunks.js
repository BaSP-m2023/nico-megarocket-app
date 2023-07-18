import {
  getMembersPending,
  getMembersSuccess,
  getMembersError,
  addMemberPending,
  addMemberSuccess,
  addMemberError,
  editMemberPending,
  editMemberIsActivePending,
  editMemberIsActiveSuccess,
  editMemberIsActiveError,
  editMemberSuccess,
  editMemberError,
  deleteMemberPending,
  deleteMemberSuccess,
  deleteMemberError
} from './actions';

const token = sessionStorage.getItem('token');

export const getAllMembers = async (dispatch) => {
  try {
    dispatch(getMembersError(''));
    dispatch(getMembersPending(true));
    const reponse = await fetch(`${process.env.REACT_APP_API_URL}/api/member`, {
      method: 'GET',
      headers: { token: token }
    });
    const data = await reponse.json();
    const membersList = data.data;
    dispatch(getMembersPending(false));
    return dispatch(getMembersSuccess(membersList));
  } catch (error) {
    dispatch(getMembersPending(false));
    return dispatch(getMembersError(true));
  }
};

export const addMember = (body) => {
  return async (dispatch) => {
    try {
      dispatch(addMemberError(false));
      dispatch(addMemberPending(true));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member/`, body);
      dispatch(addMemberPending(false));
      const data = await response.json();
      if (response.ok) {
        return dispatch(addMemberSuccess(data));
      }
      return dispatch(addMemberError({ error: true, message: data.message.code }));
    } catch (err) {
      return dispatch(addMemberError({ error: true, message: err.message.code }));
    }
  };
};

export const editMember = (id, body) => {
  return async (dispatch) => {
    try {
      dispatch(addMemberError(false));
      dispatch(editMemberPending(true));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`, body);
      const data = await response.json();
      if (response.ok) {
        dispatch(editMemberPending(false));
        dispatch(editMemberIsActivePending(false));
        return dispatch(editMemberSuccess(data));
      }
      return dispatch(editMemberError({ error: true, message: data.message }));
    } catch (err) {
      return dispatch(editMemberError({ error: true, message: err }));
    }
  };
};

export const editIsActiveMember = (id, body) => {
  return async (dispatch) => {
    try {
      dispatch(editMemberIsActivePending(true));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`, body);
      const data = await response.json();
      if (response.ok) {
        dispatch(editMemberIsActivePending(false));
        return dispatch(editMemberIsActiveSuccess(data));
      }
      return dispatch(editMemberIsActiveError({ error: true, message: data.message }));
    } catch (err) {
      return dispatch(editMemberIsActiveError({ error: true, message: err }));
    }
  };
};

export const memberDelete = (memberID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteMemberError(false));
      dispatch(deleteMemberPending(true));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${memberID}`, {
        method: 'DELETE',
        headers: { token: token }
      });
      if (response.ok) {
        dispatch(deleteMemberPending(false));
        dispatch(deleteMemberSuccess(memberID));
      }
    } catch (error) {
      dispatch(deleteMemberError(error));
    }
  };
};
