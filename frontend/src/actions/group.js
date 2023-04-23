import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_GROUPS,
  GROUP_ERROR,
  UPDATE_LIKES,
  DELETE_GROUP,
  ADD_GROUP,
  EDIT_GROUP,
  GET_GROUP,
  ADD_GROUP_POST,
  EDIT_GROUP_POST,
  DELETE_GROUP_POST,
} from "./types";
import { createBrowserHistory } from 'history';
axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;
const history = createBrowserHistory();
// Get groups
export const getGroups = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/groups");

    dispatch({
      type: GET_GROUPS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: e?.response?.statusText, status: e?.response?.status },
    });
  }
};

// Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (e) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

// Remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (e) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

//Delete Post
export const deleteGroup = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/groups/${id}`);

    dispatch({
      type: DELETE_GROUP,
      payload: id,
    });

    dispatch(setAlert("Group successfully removed", "success"));
   
  } catch (e) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
  history.push('/groups');
  window.location.reload();
};

// Add Group
export const addGroup = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/groups", formData, config);

    dispatch({
      type: ADD_GROUP,
      payload: res.data,
    });

    dispatch(setAlert("Group successfully created", "success"));
  } catch (e) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};


// Edit post
export const editGroup = (_id, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    await axios.put(`/api/groups/${_id}`, formData, config);

    dispatch({
      type: EDIT_GROUP,
      payload: _id,
    });

    dispatch(setAlert("Group successfully edited", "success"));
  } catch (e) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

// Get post
export const getGroup = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/groups/${id}`);

    dispatch({
      type: GET_GROUP,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

// Add group post
export const addgroupPost = (groupId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      `/api/groups/${groupId}/posts`,
      formData,
      config
    );

    dispatch({
      type: ADD_GROUP_POST,
      payload: res.data,
    });

    dispatch(setAlert("Post successfully added", "success"));
  } catch (e) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

// Delete group post
export const deleteGroupPost = (groupId, postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/groups/${groupId}/posts/${postId}`);

    dispatch({
      type: DELETE_GROUP_POST,
      payload: postId,
    });

    dispatch(setAlert("Post successfully deleted", "success"));
  } catch (e) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

// Edit comment
export const editComment = (groupId, postId, formData) => async (dispatch) => {
  try {
    await axios.put(`/api/groups/${groupId}/posts/${postId}`, {formData});

    dispatch({
      type: EDIT_GROUP_POST,
      payload: postId,
    });

    dispatch(setAlert("Post successfully edited", "success"));
  } catch (e) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};