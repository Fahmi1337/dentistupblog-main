import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_REPOS,
  SAVE_POST,
} from "./types";
axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;
//Get the current user's profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (e) {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

//Get all profiles
export const getAllProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get("/api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: e?.response?.statusText, status: e?.response?.status },
    });
  }
};

//Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: e.response?.statusText, status: e.response?.status },
    });
  }
 
};

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

//Create or update Profile
export const createProfile =
  (formData, history, edit) =>
  async (dispatch) => {
    dispatch(
      setAlert(
        edit 
           ? "Updating Profile..."
           : "Creating Profile...",
        "success"
      )
    );
    window.scrollTo(0, 0);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/profile", formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(
          edit
            ? "Profile Successfully Updated"
            : "Profile Successfully Created",
          "success"
        )
      );
      // If not editing
      // if (!edit) {
      //   history.push("/dashboard");
      // }
      history.push("/dashboard");
    } catch (e) {
      const errors = e.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: e.response.statusText, status: e.response.status },
      });
    }
  
    window.scrollTo(0, 0);
  };

// Add experience to the profile
export const addUserExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience successfully added", "success"));

    history.push("/dashboard");
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

// Add education to the profile
export const addUserEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education successfully added", "success"));

    history.push("/dashboard");
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
  window.scrollTo(0, 0);
};

//Delete experience
export const deleteUserExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience successfully deleted", "success"));
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
  window.scrollTo(0, 0);
};

//Delete education
export const deleteUserEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education successfully deleted", "success"));
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
  window.scrollTo(0, 0);
};

//Delete account & Profile
export const deleteUserAccount = () => async (dispatch) => {
  if (window.confirm("Please confirm. This cannot be UNDONE.")) {
    try {
      await axios.delete(`/api/profile`);

      dispatch({
        type: CLEAR_PROFILE,
        type: ACCOUNT_DELETED,
      });

      dispatch(setAlert("Account permanently deleted", "danger"));
    } catch (e) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: e.response.statusText, status: e.response.status },
      });
    }
  }
  window.scrollTo(0, 0);
};



// Save post
export const savePost = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/profile/savepost/${id}`).then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(`${error}`)
    })
    .then(json => {
      dispatch(setAlert(json.data.msg, json.status === 200 ? "success" : "danger"));

    })
    .catch((error) => {
      console.error(`Couldn't convert the json: ${error}`)
    });
    dispatch({
      type: SAVE_POST,
      payload: { id, savedPosts: res.data },
    });
    
   
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: e?.response?.statusText, status: e?.response?.status },
    });

   
  
  }
  // dispatch(setAlert("Update successful", "success"));
};

// // Save post
// export const savePost = (id) => async (dispatch) => {
//   try {
//     const res = await axios.put(`/api/profile/savepost/${id}`);
//     console.log(res.data); // Log the response data to the console
    
//     if (res.data.msg && res.data.savedPosts) {
//       dispatch({
//         type: SAVE_POST,
//         payload: { id, savedPosts: res.data.savedPosts },
//       });
      
//       dispatch(setAlert(res.data.msg, "success"));
//     } else {
//       dispatch(setAlert("Error", "danger"));
//     }
//   } catch (e) {
//     if (e?.response?.data?.msg) {
//       dispatch(setAlert(e.response.data.msg, "success"));
//     } else if (e?.response?.statusText) {
//       dispatch({
//         type: PROFILE_ERROR,
//         payload: { msg: e.response.statusText, status: e.response.status },
//       });
//       dispatch(setAlert("Error", "danger"));
//     } else {
//       dispatch(setAlert("Unknown error occurred", "danger"));
//     }
//   }
// };