import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment } from "../../actions/post";
import Moment from "react-moment";
import EditComment from "./EditComment";
import moment from "moment";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
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

const CommentItem = ({
  postId,
  comment: { _id, name, diagnostic, treatment, avatar, user, date, profileImage },
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
  

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  const [openEditComment, setOpenEditComment] = React.useState(false);
  const handleOpenEditComment = () => setOpenEditComment(true);
  const handleCloseEditComment = () => setOpenEditComment(false);
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img class="round-img" src={profileImage ? `${process.env.REACT_APP_BASE_URL +"/" + profileImage}` : avatar} alt="DentistUpAvatar" />
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
      </div>
      <div>
        <p class="my-1">{diagnostic}</p>
        <p class="my-1">{treatment}</p>
        {/* <p class="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p> */}




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
                        handleOpenEditComment();
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
                        deleteComment(postId, _id);
                      }}
                      disableRipple
                    >
                      <DeleteIcon />
                      Delete
                    </MenuItem>
                  </StyledMenu>
                </div>
              )}

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


        {/* {!auth.loading && user === auth.user._id && (
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
        )} */}
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
