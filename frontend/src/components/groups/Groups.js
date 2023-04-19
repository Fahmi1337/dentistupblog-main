import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGroups } from "../../actions/group";
import Spinner from "../layout/Spinner";
import PostItem from "./GroupItem";
 import GroupForm from "./GroupForm";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { FormGroup } from "@mui/material";

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

const Groups = ({ getGroups, group: {groups, loading} }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  useEffect(() => {
    getGroups();
  }, [getGroups]);



  const [searchKeyword, setSearchKeyword] = React.useState("");
console.log("group?", groups)
//   const filteredPosts = groups.filter((group) =>
//     group.title.toLowerCase().includes(searchKeyword.toLowerCase()) 
//   );

  const filteredPosts = [];

  return 1 !== 1 ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Groups</h1>
      <p className="lead">
        <i className="i fas fa-user"></i> Welcome to the Community
      </p>

      {/* MODAL START */}
      <form className="form">
        {" "}
        <input
          type="Text"
          placeholder="Start a new post"
          onClick={handleOpen}
        />
      </form>

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
            <GroupForm editMode={false} handleClose={handleClose}/>
          </Box>
        </Fade>
      </Modal>
      {/* MODAL END */}
      <div className="posts">
    
  <input
  id="searchGroups"
        type="text"
        placeholder="Search groups..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
{filteredPosts.length > 0 ? (
             filteredPosts.map((post) => (
              <PostItem key={post._id} post={post} showDetails={false} />
            ))
            ) : (
              <h4>No Groups found...</h4>
            )}
          </div>
          <GroupForm/>
    </Fragment>
  );
};

Groups.propTypes = {
  getGroups: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
});

export default connect(mapStateToProps, { getGroups })(Groups);
