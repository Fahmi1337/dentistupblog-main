import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";
import { savePost } from "../../actions/profile";
import { loadUser } from "../../actions/auth";
import PostDetails from "./PostDetails";
import moment from "moment";

import { styled, alpha } from "@mui/material/styles";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import EditPost from "./EditPost";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  savePost,
  loadUser,
  auth,
  post: {
    _id,
    postInfo,
    name,
    avatar,
    user,
    likes,
    comments,
    date,
    profileImage,
  },
  showActions,
  showDetails,
  showUserPosts,
  postsByUserId,
  getPost,
  match,
  showSavedCases,
  savedPostsIds,
}) => {
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80em",
    bgcolor: "background.paper",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
  };
  const [openEditPost, setOpenEditPost] = React.useState(false);
  const handleOpenEditPost = () => setOpenEditPost(true);
  const handleCloseEditPost = () => setOpenEditPost(false);

  return (
    <div className="posts">
      <Modal
        open={openEditPost}
        onClose={handleCloseEditPost}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditPost
            _id={_id}
            postInfo={postInfo}
            getPost={getPost}
            match={match}
            handleCloseEditPost={handleCloseEditPost}
          />
          {/* <PostForm _id={_id} postInfo={postInfo}  getPost={getPost} match={match} handleCloseEditPost={handleCloseEditPost} editMode={true}/> */}
        </Box>
      </Modal>
      {showUserPosts && user === postsByUserId && (
        <div>
          <div className="post bg-white p-1 my-1">
            <div>
              <Link to={`/profile/${user}`}>
                <img
                  className="round-img"
                  src={
                    profileImage
                      ? `${process.env.REACT_APP_BASE_URL + "/" + profileImage}`
                      : avatar
                  }
                  alt="Dentistup"
                />
                <h4>{name}</h4>
              </Link>
              <p className="post-date">
                {" "}
                {moment
                  .utc(date.replace("T", " ").replace("Z", ""))
                  .local()
                  .startOf("seconds")
                  .fromNow()}{" "}
              </p>
              {!auth.loading && user === auth.user._id && (
                <div className="postOptionsContainer">
                  <IconButton
                    aria-label="delete"
                    id="demo-customized-button"
                    aria-controls={open ? "demo-customized-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>

                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={(e) => {
                        handleOpenEditPost();
                        e.preventDefault();
                        handleClose();
                      }}
                      disableRipple
                    >
                      <EditIcon />
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        handleClose();
                        deletePost(_id);
                      }}
                      disableRipple
                    >
                      <DeleteIcon />
                      Delete
                    </MenuItem>
                  </StyledMenu>
                </div>
              )}
            </div>
            <div>
              <h2 className="my-1">
                {" "}
                <Fragment>
                  <Link to={`/posts/${_id}`}>{postInfo.title}</Link>
                </Fragment>
              </h2>

              {!showDetails && (
                <Fragment>
                  <Link to={`/posts/${_id}`}>
                    <p className="my-1">
                      {postInfo.description?.slice(0, 200) +
                        (postInfo.description?.length > 200 ? "..." : "")}
                    </p>
                    <div>
                <img src={postInfo.postImage} alt="postImage" style={{width: 300, height:"auto"}} />
                </div>
                  </Link>
                </Fragment>
              )}
              <div className="postIconsInfo">
                {postInfo.gender === "male" && (
                  <i
                    class="fa-solid fa-mars"
                    style={{ color: "#4e9ec64d" }}
                  ></i>
                )}
                {postInfo.gender === "female" && (
                  <i class="fa-solid fa-venus" style={{ color: "pink" }}></i>
                )}
                <p>{getAge(postInfo.dateOfBirth)} </p>
                <i
                  class="fa-solid fa-heart-pulse"
                  style={{ color: "#4e9ec64d" }}
                ></i>
                <p>{postInfo.pulse} </p>

                <i class="fa-solid fa-lungs" style={{ color: "#4e9ec64d" }}></i>
                <p>{postInfo.respiration} </p>

                <i
                  class="fa-solid fa-droplet"
                  style={{ color: "#4e9ec64d" }}
                ></i>
                <p>{postInfo.bloodPressure} </p>

                <i class="fa-solid fa-tooth" style={{ color: "#4e9ec64d" }}></i>
                <p>{postInfo.concernedTeeth} </p>
              </div>

              <Fragment>
                {/* <button
                  onClick={() => addLike(_id)}
                  type="button"
                  className="btn btn-light"
                >
                  <i className="fa-regular fa-heart" />{" "}
                  <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                </button> */}
                {/* <button
                  onClick={() => removeLike(_id)}
                  type="button"
                  className="btn btn-light"
                >
                  <i className="fa-regular fa-thumbs-down" />
                </button> */}

                {likes.filter(
                  (like) => like?.user?.toString() === auth?.user?._id
                ).length === 0 && (
                  <button
                    onClick={() => {
                      addLike(_id);
                      loadUser();
                      loadUser();
                      console.log("likes?", likes, "user", auth?.user?._id);
                    }}
                    type="button"
                    className="btn btn-light"
                  >
                    <i class="fa-regular fa-heart"></i>{" "}
                    <span>
                      {likes.length > 0 && <span>{likes.length}</span>}
                    </span>
                  </button>
                )}

                {likes?.filter(
                  (like) => like?.user?.toString() === auth?.user?._id
                ).length !== 0 && (
                  <button
                    onClick={() => {
                      addLike(_id);
                      loadUser();
                      loadUser();
                    }}
                    type="button"
                    className="btn btn-light"
                  >
                    <i class="fa-solid fa-heart"></i>{" "}
                    <span>
                      {likes.length > 0 && <span>{likes.length}</span>}
                    </span>
                  </button>
                )}

                {showActions && (
                  <Fragment>
                    <Link to={`/posts/${_id}`} className="btn comments-btn">
                      <i class="fa-regular fa-comment"></i>{" "}
                      {comments.length > 0 && (
                        <span className="comment-count">{comments.length}</span>
                      )}
                    </Link>
                  </Fragment>
                )}
                {_id &&
                  auth?.user?.savedPosts?.filter(
                    (savedPost) => savedPost?.post?.toString() === _id
                  ).length === 0 && (
                    <button
                      onClick={() => {
                        savePost(_id);
                        loadUser();
                        loadUser();
                      }}
                      type="button"
                      className="btn btn-light"
                    >
                      <i class="fa-regular fa-bookmark"></i>
                    </button>
                  )}

                {_id &&
                  auth?.user?.savedPosts?.filter(
                    (savedPost) => savedPost?.post?.toString() === _id
                  ).length !== 0 && (
                    <button
                      onClick={() => {
                        savePost(_id);
                        loadUser();
                        loadUser();
                      }}
                      type="button"
                      className="btn btn-light"
                    >
                      <i class="fa-solid fa-bookmark"></i>
                    </button>
                  )}

                {/* {!auth.loading && user === auth.user._id && (
                  <button
                    onClick={(e) => deletePost(_id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    <i class="fa-regular fa-trash-can"></i>
                  </button>
                )} */}
              </Fragment>
            </div>
          </div>
          {showDetails && (
            <PostDetails
              postInfo={postInfo}
              auth={auth}
              user={user}
              deletePost={deletePost}
              _id={_id}
              getPost={getPost}
              match={match}
            />
          )}
        </div>
      )}

      {!showUserPosts && !showSavedCases && (
        <div>
          <div className="post bg-white p-1 my-1">
            <div>
              <Link to={`/profile/${user}`}>
                <img
                  className="round-img"
                  src={
                    profileImage
                      ? `${process.env.REACT_APP_BASE_URL + "/" + profileImage}`
                      : avatar
                  }
                  alt="Dentisup"
                />
                <h4>{name}</h4>
              </Link>
              <p className="post-date">
                {" "}
                {moment
                  .utc(date.replace("T", " ").replace("Z", ""))

                  .local()
                  .startOf("seconds")
                  .fromNow()}{" "}
              </p>
              {!auth.loading && user === auth.user._id && (
                <div className="postOptionsContainer">
                  <IconButton
                    aria-label="delete"
                    id="demo-customized-button"
                    aria-controls={open ? "demo-customized-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>

                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={(e) => {
                        handleOpenEditPost();
                        e.preventDefault();
                        handleClose();
                      }}
                      disableRipple
                    >
                      <EditIcon />
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        handleClose();
                        deletePost(_id);
                      }}
                      disableRipple
                    >
                      <DeleteIcon />
                      Delete
                    </MenuItem>
                  </StyledMenu>
                </div>
              )}
            </div>
            <div>
              <h2 className="my-1">
                {" "}
                <Fragment>
                  <Link to={`/posts/${_id}`}>{postInfo.title}</Link>
                </Fragment>
              </h2>

              {!showDetails && (
                <Fragment>
                  <Link to={`/posts/${_id}`}>
                    <p className="my-1">
                      {postInfo.description?.slice(0, 200) +
                        (postInfo.description?.length > 200 ? "..." : "")}
                    </p>
                    <div>
                <img src={postInfo.postImage} alt="postImage" style={{width: 300, height:"auto"}} />
                </div>
                  </Link>
                </Fragment>
              )}
            
              <div className="postIconsInfo">
                {postInfo.gender === "male" && (
                  <i
                    class="fa-solid fa-mars"
                    style={{ color: "#4e9ec64d" }}
                  ></i>
                )}
                {postInfo.gender === "female" && (
                  <i class="fa-solid fa-venus" style={{ color: "pink" }}></i>
                )}
                <p>{getAge(postInfo.dateOfBirth)} </p>
                <i
                  class="fa-solid fa-heart-pulse"
                  style={{ color: "#4e9ec64d" }}
                ></i>
                <p>{postInfo.pulse} </p>

                <i class="fa-solid fa-lungs" style={{ color: "#4e9ec64d" }}></i>
                <p>{postInfo.respiration} </p>

                <i
                  class="fa-solid fa-droplet"
                  style={{ color: "#4e9ec64d" }}
                ></i>
                <p>{postInfo.bloodPressure} </p>

                <i class="fa-solid fa-tooth" style={{ color: "#4e9ec64d" }}></i>
                <p>{postInfo.concernedTeeth} </p>
              </div>

              <Fragment>
                {likes.filter(
                  (like) => like?.user?.toString() === auth?.user?._id
                ).length === 0 && (
                  <button
                    onClick={() => {
                      addLike(_id);
                      loadUser();
                      loadUser();
                      console.log("likes?", likes, "user", auth?.user?._id);
                    }}
                    type="button"
                    className="btn btn-light"
                  >
                    <i class="fa-regular fa-heart"></i>{" "}
                    <span>
                      {likes.length > 0 && <span>{likes.length}</span>}
                    </span>
                  </button>
                )}

                {likes?.filter(
                  (like) => like?.user?.toString() === auth?.user?._id
                ).length !== 0 && (
                  <button
                    onClick={() => {
                      addLike(_id);
                      loadUser();
                      loadUser();
                    }}
                    type="button"
                    className="btn btn-light"
                  >
                    <i class="fa-solid fa-heart"></i>{" "}
                    <span>
                      {likes.length > 0 && <span>{likes.length}</span>}
                    </span>
                  </button>
                )}

                {/* <button
                  onClick={() => removeLike(_id)}
                  type="button"
                  className="btn btn-light"
                >
                  <i className="fa-regular fa-thumbs-down" />
                </button> */}
                {showActions && (
                  <Fragment>
                    <Link to={`/posts/${_id}`} className="btn comments-btn">
                      <i class="fa-regular fa-comment"></i>{" "}
                      {comments.length > 0 && (
                        <span className="comment-count">{comments.length}</span>
                      )}
                    </Link>
                  </Fragment>
                )}
                {/* HELLO */}
                {_id &&
                  auth?.user?.savedPosts?.filter(
                    (savedPost) => savedPost?.post?.toString() === _id
                  ).length === 0 && (
                    <button
                      onClick={() => {
                        savePost(_id);
                        loadUser();
                        loadUser();
                      }}
                      type="button"
                      className="btn btn-light"
                    >
                      <i class="fa-regular fa-bookmark"></i>
                    </button>
                  )}

                {_id &&
                  auth?.user?.savedPosts?.filter(
                    (savedPost) => savedPost?.post?.toString() === _id
                  ).length !== 0 && (
                    <button
                      onClick={() => {
                        savePost(_id);
                        loadUser();
                        loadUser();
                      }}
                      type="button"
                      className="btn btn-light"
                    >
                      <i class="fa-solid fa-bookmark"></i>
                    </button>
                  )}
              </Fragment>
            </div>
          </div>
          {showDetails && (
            <PostDetails
              postInfo={postInfo}
              auth={auth}
              user={user}
              deletePost={deletePost}
              _id={_id}
              getPost={getPost}
              match={match}
            />
          )}
        </div>
      )}

      {showSavedCases && savedPostsIds.includes(_id) && (
        <div>
          <div className="post bg-white p-1 my-1">
            <div>
              <Link to={`/profile/${user}`}>
                <img
                  className="round-img"
                  src={
                    profileImage
                      ? `${process.env.REACT_APP_BASE_URL + "/" + profileImage}`
                      : avatar
                  }
                  alt="Dentistup"
                />
                <h4>{name}</h4>
              </Link>
              <p className="post-date">
                {" "}
                {moment
                  .utc(date.replace("T", " ").replace("Z", ""))

                  .local()
                  .startOf("seconds")
                  .fromNow()}
              </p>
              {!auth.loading && user === auth.user._id && (
                <div className="postOptionsContainer">
                  <IconButton
                    aria-label="delete"
                    id="demo-customized-button"
                    aria-controls={open ? "demo-customized-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>

                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={(e) => {
                        handleOpenEditPost();
                        e.preventDefault();
                        handleClose();
                      }}
                      disableRipple
                    >
                      <EditIcon />
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        handleClose();
                        deletePost(_id);
                      }}
                      disableRipple
                    >
                      <DeleteIcon />
                      Delete
                    </MenuItem>
                  </StyledMenu>
                </div>
              )}
            </div>

            <div>
              <h2 className="my-1">
                {" "}
                <Fragment>
                  <Link to={`/posts/${_id}`}>{postInfo.title}</Link>
                </Fragment>
              </h2>

              {!showDetails && (
                <Fragment>
                  <Link to={`/posts/${_id}`}>
                    <p className="my-1">
                      {postInfo.description?.slice(0, 200) +
                        (postInfo.description?.length > 200 ? "..." : "")}
                    </p>
                    <div>
                <img src={postInfo.postImage} alt="postImage" style={{width: 300, height:"auto"}} />
                </div>
                  </Link>
                </Fragment>
              )}
              <div className="postIconsInfo">
                {postInfo.gender === "male" && (
                  <i
                    class="fa-solid fa-mars"
                    style={{ color: "#4e9ec64d" }}
                  ></i>
                )}
                {postInfo.gender === "female" && (
                  <i class="fa-solid fa-venus" style={{ color: "pink" }}></i>
                )}
                <p>{getAge(postInfo.dateOfBirth)} </p>
                <i
                  class="fa-solid fa-heart-pulse"
                  style={{ color: "#4e9ec64d" }}
                ></i>
                <p>{postInfo.pulse} </p>

                <i class="fa-solid fa-lungs" style={{ color: "#4e9ec64d" }}></i>
                <p>{postInfo.respiration} </p>

                <i
                  class="fa-solid fa-droplet"
                  style={{ color: "#4e9ec64d" }}
                ></i>
                <p>{postInfo.bloodPressure} </p>

                <i class="fa-solid fa-tooth" style={{ color: "#4e9ec64d" }}></i>
                <p>{postInfo.concernedTeeth} </p>
              </div>

              <Fragment>
                {/* <button
                  onClick={() => addLike(_id)}
                  type="button"
                  className="btn btn-light"
                >
                  <i className="fa-regular fa-heart" />{" "}
                  <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                </button> */}
                {/* <button
                  onClick={() => removeLike(_id)}
                  type="button"
                  className="btn btn-light"
                >
                  <i className="fa-regular fa-thumbs-down" />
                </button> */}

                {likes.filter(
                  (like) => like?.user?.toString() === auth?.user?._id
                ).length === 0 && (
                  <button
                    onClick={() => {
                      addLike(_id);
                      loadUser();
                      loadUser();
                      console.log("likes?", likes, "user", auth?.user?._id);
                    }}
                    type="button"
                    className="btn btn-light"
                  >
                    <i class="fa-regular fa-heart"></i>{" "}
                    <span>
                      {likes.length > 0 && <span>{likes.length}</span>}
                    </span>
                  </button>
                )}

                {likes?.filter(
                  (like) => like?.user?.toString() === auth?.user?._id
                ).length !== 0 && (
                  <button
                    onClick={() => {
                      addLike(_id);
                      loadUser();
                      loadUser();
                    }}
                    type="button"
                    className="btn btn-light"
                  >
                    <i class="fa-solid fa-heart"></i>{" "}
                    <span>
                      {likes.length > 0 && <span>{likes.length}</span>}
                    </span>
                  </button>
                )}

                {/* {auth?.user?.savedPosts?.filter((savedPost) => savedPost?.post?.toString() !== _id) === 0 &&  <button
                    onClick={() => savePost(_id)}
                    type="button"
                    className="btn btn-light"
                  >
                    <i class="fa-regular fa-bookmark"></i>
                  </button>} */}

                {showActions && (
                  <Fragment>
                    <Link to={`/posts/${_id}`} className="btn comments-btn">
                      <i class="fa-regular fa-comment"></i>{" "}
                      {comments.length > 0 && (
                        <span className="comment-count">{comments.length}</span>
                      )}
                    </Link>
                  </Fragment>
                )}
                {_id && savedPostsIds.includes(_id) && (
                  <button
                    onClick={() => {
                      savePost(_id);
                      loadUser();
                      loadUser();
                    }}
                    type="button"
                    className="btn btn-light"
                  >
                    <i class="fa-solid fa-bookmark"></i>
                  </button>
                )}

                {/* {!auth.loading && user === auth.user._id && (
                  <button
                    onClick={(e) => deletePost(_id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    <i class="fa-regular fa-trash-can"></i>
                  </button>
                )} */}
              </Fragment>
            </div>
          </div>
          {showDetails && (
            <PostDetails
              postInfo={postInfo}
              auth={auth}
              user={user}
              deletePost={deletePost}
              _id={_id}
              getPost={getPost}
              match={match}
            />
          )}
        </div>
      )}
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
  showDetails: true,
  showUserPosts: false,
  showSavedCases: false,
};

PostItem.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  savePost: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePost,
  savePost,
  loadUser,
})(PostItem);
