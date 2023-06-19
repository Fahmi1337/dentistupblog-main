import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGroups } from "../../actions/group";
import { Link } from "react-router-dom";
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

const Groups = ({ getGroups, group: { groups, loading } }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  const [searchKeyword, setSearchKeyword] = React.useState("");
  console.log("group?", groups[0]);
  const filteredGroups = groups.filter((group) =>
    group?.groupInfo?.title?.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  //   const filteredGroups = [];

  return loading ? (
    <Spinner />
  ) : (
    //     <Fragment>
    //       <h1 className="large text-primary">Groups</h1>
    //       <p className="lead">
    //         <i className="i fas fa-user"></i> Welcome to the Community
    //       </p>

    //       {/* MODAL START */}
    //       {/* <form className="form">
    //         {" "}
    //         <input
    //           type="Text"
    //           placeholder="Start a new post"
    //           onClick={handleOpen}
    //         />
    //       </form> */}
    // <Button onClick={handleOpen}>Add Group</Button>
    //       <Modal
    //         aria-labelledby="transition-modal-title"
    //         aria-describedby="transition-modal-description"
    //         open={open}
    //         onClose={handleClose}
    //         closeAfterTransition
    //         slots={{ backdrop: Backdrop }}
    //         slotProps={{
    //           backdrop: {
    //             timeout: 500,
    //           },
    //         }}
    //       >
    //         <Fade in={open}>
    //           <Box sx={style}>
    //             {/* PostForm */}
    //             <GroupForm editMode={false} handleClose={handleClose}/>
    //           </Box>
    //         </Fade>
    //       </Modal>
    //       {/* MODAL END */}
    //       <div className="posts">

    //   <input
    //   id="searchGroups"
    //         type="text"
    //         placeholder="Search groups..."
    //         value={searchKeyword}
    //         onChange={(e) => setSearchKeyword(e.target.value)}
    //       />
    // {filteredGroups.length > 0 ? (
    //              filteredGroups.map((group) => (
    //               <GroupItem key={group._id} group={group} showDetails={false}/>
    //             ))
    //             ) : (
    //               <h4>No Groups found...</h4>
    //             )}
    //           </div>

    //     </Fragment>

    <div className="groupsContainer">
      <h1 className="large text-primary">Groups</h1>
      <p className="lead">
        <i className="i fas fa-user"></i> Welcome to the Community
      </p>
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
            <GroupForm editMode={false} handleClose={handleClose} />
          </Box>
        </Fade>
      </Modal>
      {/* MODAL END */}
      <div className="posts">
        <input
          id="SearchInputTopBar"
          style={{ padding: "1em", height: "3em", margin: "2em 0em 2em -10em" }}
          type="text"
          placeholder="Search groups..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>

      <div className="profiles">
        <div className="profile-item bg-light">
          <img
            className="round-img"
            src={
              "https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2021/4/shutterstock_56198956.jpg"
            }
            alt="Dentisup"
          ></img>
          <div>
            <h2>Teeth Whitening Group</h2>
            <p>Group for teeth whitening discussions</p>
            <p className="my-1">Public</p>
            <Link to={`/profile/`} className="btn btn-primary">
              View Group
            </Link>
          </div>
          {/* <ul>
          {skills.slice(0, 4).map((skill, index) => (
            <li key={index} className="text-primary">
              <i className="fas fa-check" /> {skill}
            </li>
          ))}
        </ul> */}
        </div>
        <div className="profile-item bg-light">
          <img
            className="round-img"
            src={
              "https://i0.wp.com/piccadillydental.co.uk/wp-content/uploads/2017/08/anatomy-of-healthy-teeth-and-tooth-dental-implant-P5PWYZQ-scaled.jpg?fit=2560%2C1920&ssl=1"
            }
            alt="Dentisup"
          ></img>
          <div>
            <h2>Teeth Implant Group</h2>
            <p>Group for teeth implant discussions</p>
            <p className="my-1">Private</p>
            <Link to={`/profile/`} className="btn btn-primary">
              View Group
            </Link>
          </div>
          {/* <ul>
          {skills.slice(0, 4).map((skill, index) => (
            <li key={index} className="text-primary">
              <i className="fas fa-check" /> {skill}
            </li>
          ))}
        </ul> */}
        </div>
      </div>
    </div>
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
