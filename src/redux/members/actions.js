import { GET_MEMBERS, ADD_MEMBER, EDIT_MEMBER, DELETE_MEMBER } from './constants';

export const getMembers = (list) => {
  return {
    type: GET_MEMBERS,
    payload: list
  };
};

export const addMember = (member) => {
  return {
    type: ADD_MEMBER,
    payload: member
  };
};

export const editMember = (member) => {
  return {
    type: EDIT_MEMBER,
    payload: member
  };
};

export const deleteMember = (memberID) => {
  return {
    type: DELETE_MEMBER,
    payload: memberID
  };
};
