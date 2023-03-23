import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment } from "../../actions/post";
import Moment from "react-moment";
import EditComment from "./EditComment";

import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
const CommentItem = ({
  postId,
  comment: { _id, name, diagnostic, treatment, avatar, user, date },
  auth,
  comment,
  deleteComment,
  getPost,
  match,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
  borderRadius: 5,
    boxShadow: 24,
    p: 4,
  };
  const [openEditComment, setOpenEditComment] = React.useState(false);
  const handleOpenEditComment = () => setOpenEditComment(true);
  const handleCloseEditComment = () => setOpenEditComment(false);
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img class="round-img" src={avatar} alt="DentistUpAvatar" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">{diagnostic}</p>
        <p class="my-1">{treatment}</p>
        <p class="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <div>
             <Modal
              open={openEditComment}
              onClose={handleCloseEditComment}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <EditComment _id={_id} auth={auth} postId={postId} diagnostic={diagnostic} treatment={treatment} comment={comment} handleCloseEditComment={handleCloseEditComment} getPost={getPost} match={match}/>
              </Box>
            </Modal>
            <button type="button" className="btn btn-success"   onClick={() => {
                handleOpenEditComment();
              }}>
              <i className="fas fa-pen-alt"></i>
            </button>
            <button
              onClick={(e) => deleteComment(postId, _id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
