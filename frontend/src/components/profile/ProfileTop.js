import React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import PostItem from "../posts/PostItem";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory } from "react-router-dom";

import bg from "../../img/dentistUpProfileBG.png";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70rem",
  bgcolor: "#91cbd74d",

  boxShadow: 24,
  p: 4,
};

const ProfileTop = ({
  profile: {
    status,
    speciality,
    company,
    location,
    website,
    social,
    profileImage,
    profileCover,
    title,
    user: { name, avatar, _id },
  },
  auth,
  posts,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const history = useHistory();

  const uploadsIndex = profileCover?.indexOf("uploads");
  if (uploadsIndex !== -1 && profileCover) {
    profileCover =
      profileCover.slice(0, uploadsIndex + "uploads".length) +
      "/" +
      profileCover.slice(uploadsIndex + "uploads".length);
  }
  const getUserPostsCount = () => {
    /* we will compare _id with posts.user */
    return posts.filter((g) => _id?.includes(g.user)).map((g) => g.user).length;
  };

  const renderedCurrentUserPosts = posts.map((post) => (
    <PostItem
      key={post._id}
      post={post}
      showDetails={false}
      postsByUserId={_id}
      showUserPosts={true}
    />
  ));

  return (
    <div>
      <div
        className="profile-top-container bg-light"
        style={{
          backgroundImage: profileCover
            ? "url(" +
              `${process.env.REACT_APP_BASE_URL + "/" + profileCover}` +
              ")"
            : "url(" + bg + ")",
        }}
      >
        {" "}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {/* PostForm */}
            {/* {posts.map((post) => (
          <PostItem key={post._id} post={post} showDetails={false} postsByUserId={_id} showUserPosts={true}/>
        ))} */}
            {getUserPostsCount() > 0 ? (
              renderedCurrentUserPosts
            ) : (
              <h3>{name} doesn't have any posts yet!</h3>
            )}
          </Box>
        </Fade>
      </Modal>
      <div className="profileTopSecondContainer">
        <div className="profilePictureContainer">
          <img
            className="round-img my-1"
            src={
              profileImage
                ? `${process.env.REACT_APP_BASE_URL + "/" + profileImage}`
                : avatar
            }
            alt="dentistUpProfilePicture"
          />
        </div>

        <div className="profile-top p-2">
          <h1 className="large">
            {title} {name}
          </h1>
          <p className="lead">
            {status} {company && <span> at {company}</span>}
          </p>
          <p className="lead">{speciality} speciality</p>
          <p className="lead">{location && <span>{location}</span>}</p>
          <div className="profileButtonsContainer">
            <span
              className="btn-round"
              onClick={function (e) {
                e.preventDefault();
                alert("Coming soon!");
              }}
            >
              500+ Connections
            </span>
            <span className="btn-round" onClick={handleOpen}>
              {getUserPostsCount()} Cases
            </span>
          </div>
          <div className="icons my-1">
            {website && website !== "undefined" && (
              <a
                href={
                  website.includes("https://www.")
                    ? website
                    : "https://www." + website
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-globe fa-2x"></i>
              </a>
            )}
            {social && social.twitter && social.twitter !== "undefined" && (
              <a
                href={
                  social.twitter.includes("https://www.twitter.com/")
                    ? social.twitter
                    : "https://www.twitter.com/" + social.twitter
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter fa-2x"></i>
              </a>
            )}
            {social && social.facebook && social.facebook !== "undefined" && (
              <a
                href={
                  social.facebook.includes("https://www.facebook.com/")
                    ? social.facebook
                    : "https://www.facebook.com/" + social.facebook
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook fa-2x"></i>
              </a>
            )}
            {social && social.linkedin && social.linkedin !== "undefined" && (
              <a
                href={
                  social.linkedin.includes("https://www.linkedin.com/in/")
                    ? social.linkedin
                    : "https://www.linkedin.com/in/" + social.linkedin
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
            )}
            {social && social.youtube && social.youtube !== "undefined" && (
              <a
                href={
                  social.youtube.includes("https://www.youtube.com/@")
                    ? social.youtube
                    : "https://www.youtube.com/@" + social.youtube
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube fa-2x"></i>
              </a>
            )}
            {social && social.instagram && social.instagram !== "undefined" && (
              <a
                href={
                  social.instagram.includes("https://www.instagram.com/")
                    ? social.instagram
                    : "https://www.instagram.com/" + social.instagram
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram fa-2x"></i>
              </a>
            )}
          </div>
        </div>
        <div className="editProfileButtonContainer">
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id !== _id && (
              <button
                className="btn-round"
                onClick={function (e) {
                  e.preventDefault();
                  alert("Coming soon!");
                }}
              >
                + Follow
              </button>
            )}

          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === _id && (
              <IconButton
                aria-label="edit"
                className="editProfile-btn-round"
                onClick={function (e) {
                  e.preventDefault();
                  history.push("/dashboard");
                }}
              >
                <EditIcon />
              </IconButton>
            )}

          {/* <button className="btn-round" onClick={function(e){ e.preventDefault(); alert('Coming soon!')}}>Edit</button> */}
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
