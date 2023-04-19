import {
    GET_GROUPS,
    GROUP_ERROR,
    UPDATE_LIKES,
    DELETE_GROUP,
    ADD_GROUP,
    GET_GROUP,
    ADD_COMMENT,
    DELETE_COMMENT,
  } from "../actions/types";
  
  const initialState = {
    groups: [],
    group: null,
    loading: true,
    error: {},
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  // console.log("groups store", action);
    switch (type) {
      case GET_GROUPS:
        return {
          ...state,
          groups: payload,
          loading: false,
        };
      case GET_GROUP:
        return {
          ...state,
          group: payload,
          loading: false,
        };
      case ADD_GROUP:
        return {
          ...state,
          groups: [payload, ...state.groups],
          loading: false,
        };
      case DELETE_GROUP:
        return {
          ...state,
          groups: state.groups.filter((group) => group._id !== payload),
          loading: false,
        };
      case GROUP_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      case UPDATE_LIKES:
        return {
          ...state,
          groups: state.groups.map((group) =>
            group._id === payload.id ? { ...group, likes: payload.likes } : group
          ),
          loading: false,
        };
      case ADD_COMMENT:
        return {
          ...state,
          group: { ...state.group, comments: payload },
          loading: false,
        };
      case DELETE_COMMENT:
        return {
          ...state,
          group: {
            ...state.group,
            comments: state.group.comments.filter(
              (comment) => comment._id !== payload
            ),
          },
          loading: false,
        };
      default:
        return state;
    }
  }
  