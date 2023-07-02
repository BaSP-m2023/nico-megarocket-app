import {
  GET_MEMBERS_PENDING,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_ERROR,
  GET_MEMBER_BY_ID_PENDING,
  GET_MEMBER_BY_ID_SUCCESS,
  GET_MEMBER_BY_ID_ERROR,
  ADD_MEMBER_PENDING,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_ERROR,
  EDIT_MEMBER_PENDING,
  EDIT_MEMBER_IS_ACTIVE_PENDING,
  EDIT_MEMBER_IS_ACTIVE_SUCCESS,
  EDIT_MEMBER_IS_ACTIVE_ERROR,
  EDIT_MEMBER_SUCCESS,
  EDIT_MEMBER_ERROR,
  DELETE_MEMBER_PENDING,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_ERROR
} from './constants';

export const getMembersPending = (pending) => {
  return {
    type: GET_MEMBERS_PENDING,
    payload: pending
  };
};

export const getMembersSuccess = (list) => {
  return {
    type: GET_MEMBERS_SUCCESS,
    payload: list
  };
};

export const getMembersError = (error) => {
  return {
    type: GET_MEMBERS_ERROR,
    payload: error
  };
};

export const getMemberByIdPending = (pending) => {
  return {
    type: GET_MEMBER_BY_ID_PENDING,
    payload: pending
  };
};

export const getMemberByIdSuccess = (list) => {
  return {
    type: GET_MEMBER_BY_ID_SUCCESS,
    payload: list
  };
};

export const getMemberByIdError = (error) => {
  return {
    type: GET_MEMBER_BY_ID_ERROR,
    payload: error
  };
};

export const addMemberPending = (pending) => {
  return {
    type: ADD_MEMBER_PENDING,
    payload: pending
  };
};

export const addMemberSuccess = (member) => {
  return {
    type: ADD_MEMBER_SUCCESS,
    payload: member
  };
};

export const addMemberError = (error) => {
  return {
    type: ADD_MEMBER_ERROR,
    payload: error
  };
};

export const editMemberPending = (pending) => {
  return {
    type: EDIT_MEMBER_PENDING,
    payload: pending
  };
};

export const editMemberSuccess = (member) => {
  return {
    type: EDIT_MEMBER_SUCCESS,
    payload: member
  };
};

export const editMemberError = (error) => {
  return {
    type: EDIT_MEMBER_ERROR,
    payload: error
  };
};

export const editMemberIsActivePending = (pending) => {
  return {
    type: EDIT_MEMBER_IS_ACTIVE_PENDING,
    payload: pending
  };
};

export const editMemberIsActiveSuccess = (member) => {
  return {
    type: EDIT_MEMBER_IS_ACTIVE_SUCCESS,
    payload: member
  };
};

export const editMemberIsActiveError = (error) => {
  return {
    type: EDIT_MEMBER_IS_ACTIVE_ERROR,
    payload: error
  };
};

export const deleteMemberPending = (pending) => {
  return {
    type: DELETE_MEMBER_PENDING,
    payload: pending
  };
};

export const deleteMemberSuccess = (memberID) => {
  return {
    type: DELETE_MEMBER_SUCCESS,
    payload: memberID
  };
};

export const deleteMemberError = (error) => {
  return {
    type: DELETE_MEMBER_ERROR,
    payload: error
  };
};
