import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  EDIT_POST,
  GET_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from "./types";
import { createBrowserHistory } from "history";
axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;
const history = createBrowserHistory();
// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: POST_ERROR,
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
      type: POST_ERROR,
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
      type: POST_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

//Delete Post
export const deletePost = (id) => async (dispatch) => {
  if (window.confirm("Are you sure you want to delete the post?")) {
    try {
      await axios.delete(`/api/posts/${id}`);

      dispatch({
        type: DELETE_POST,
        payload: id,
      });

      dispatch(setAlert("Post successfully removed", "success"));
    } catch (e) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: e.response.statusText, status: e.response.status },
      });
    }
    history.push("/posts");
    window.location.reload();
  }
};

// Add Post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/posts", formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert("Post successfully created", "success"));
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

// Edit post
export const editPost = (_id, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    await axios.put(`/api/posts/${_id}`, formData, config);

    dispatch({
      type: EDIT_POST,
      payload: _id,
    });

    dispatch(setAlert("Post successfully edited", "success"));
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    window.scrollTo(0, 0);
    dispatch(setAlert("Comment successfully added", "success"));
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  if (window.confirm("Are you sure you want to delete the comment?")) {
    try {
      await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
  
      dispatch({
        type: DELETE_COMMENT,
        payload: commentId,
      });
  
      dispatch(setAlert("Comment successfully deleted", "success"));
    } catch (e) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: e?.response?.statusText, status: e?.response?.status },
      });
    }
  }

};

// Edit comment
export const editComment =
  (postId, commentId, formData) => async (dispatch) => {
    try {
      await axios.put(`/api/posts/comment/${postId}/${commentId}`, {
        formData,
      });

      dispatch({
        type: EDIT_COMMENT,
        payload: commentId,
      });

      dispatch(setAlert("Comment successfully edited", "success"));
    } catch (e) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: e.response.statusText, status: e.response.status },
      });
    }
  };
