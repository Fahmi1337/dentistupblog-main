import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGroups } from "../../actions/group";
import Spinner from "../layout/Spinner";
import GroupItem from "./GroupItem";
 import GroupForm from "./GroupForm";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { FormGroup } from "@mui/material";
import { Button } from "react-bootstrap";
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
console.log("group?", groups[0])
  const filteredGroups = groups.filter((group) =>
    group?.groupInfo?.title?.toLowerCase().includes(searchKeyword.toLowerCase()) 
  );

//   const filteredGroups = [];

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Groups</h1>
      <p className="lead">
        <i className="i fas fa-user"></i> Welcome to the Community
      </p>

      {/* MODAL START */}
      {/* <form className="form">
        {" "}
        <input
          type="Text"
          placeholder="Start a new post"
          onClick={handleOpen}
        />
      </form> */}
<Button onClick={handleOpen}>Add Group</Button>
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
{filteredGroups.length > 0 ? (
             filteredGroups.map((group) => (
              <GroupItem key={group._id} group={group} showDetails={false}/>
            ))
            ) : (
              <h4>No Groups found...</h4>
            )}
          </div>
        
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
