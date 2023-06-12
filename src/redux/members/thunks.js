import {
  getMembersPending,
  getMembersSuccess,
  getMembersError,
  addMemberPending,
  addMemberSuccess,
  addMemberError,
  editMemberPending,
  editMemberSuccess,
  editMemberError,
  deleteMemberPending,
  deleteMemberSuccess,
  deleteMemberError
} from './actions';

export const getAllMembers = async (dispatch) => {
  try {
    dispatch(getMembersError(''));
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

export const addMember = (member) => {
  return async (dispatch) => {
    try {
      dispatch(addMemberPending(true));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: member.firstName,
          lastName: member.lastName,
          dni: member.dni,
          birthday: member.birthday,
          phone: member.phone,
          email: member.email,
          city: member.city,
          postalCode: member.postalCode,
          isActive: member.isActive,
          membership: member.membership
        })
      });
      dispatch(addMemberPending(false));
      const data = await response.json();
      if (!response.ok) {
        return dispatch(addMemberError({ error: true, message: data.message }));
      }
      dispatch(addMemberError({ error: false, message: '' }));
      dispatch(addMemberSuccess(data));
    } catch (err) {
      return dispatch(addMemberError({ error: true, message: err }));
    }
  };
};

export const editMember = (id, member) => {
  return async (dispatch) => {
    try {
      dispatch(editMemberPending(true));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(member)
      });
      dispatch(editMemberPending(false));
      const data = await response.json();
      if (response.ok) {
        dispatch(editMemberSuccess(data));
        dispatch(editMemberError(true));
      } else {
        dispatch(editMemberError(response.message));
      }
    } catch (error) {
      dispatch(editMemberError(error));
    }
  };
};

export const memberDelete = (memberID) => {
  return async (dispatch) => {
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
};
