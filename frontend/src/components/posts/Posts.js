import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70rem",
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

const Posts = ({ getPosts, post: { posts, loading }, auth }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const [searchKeyword, setSearchKeyword] = React.useState("");

  const filteredPosts = posts.filter((post) =>
    post.postInfo.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="grey-bg">
        {/* <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="i fas fa-user"></i> Welcome to the Community
      </p> */}

        {/* MODAL START */}

        <div className="posts">
          <div className="inputNewPostContainer">
            <img
              alt="Dentistup"
              src={
                auth?.user?.profileImage
                  ? `${
                      process.env.REACT_APP_BASE_URL +
                      "/" +
                      auth?.user?.profileImage
                    }`
                  : auth?.user?.avatar
              }
            />
            <form className="form newpost-form">
              {" "}
              <input
                type="Text"
                placeholder="Start a new post"
                onClick={handleOpen}
              />
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  handleOpen();
                }}
              >
                Ask for recommendation
              </button>
            </form>
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
                <PostForm editMode={false} handleClose={handleClose} />
              </Box>
            </Fade>
          </Modal>
          {/* MODAL END */}
          {/* {posts.map((post) => (
          <PostItem key={post._id} post={post} showDetails={false} />
        ))} */}
          {/* <input
  id="searchPosts"
        type="text"
        placeholder="Search posts..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      /> */}
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostItem key={post._id} post={post} showDetails={false} />
            ))
          ) : (
            <h4>No Posts found...</h4>
          )}
        </div>
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPosts })(Posts);
