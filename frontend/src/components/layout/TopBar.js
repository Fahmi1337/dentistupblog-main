import * as React from "react";
import { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import logoDentistup from "../../img/logoDentistup.png";
import { styled, alpha } from "@mui/material/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InputBase from "@mui/material/InputBase";
import { logoutUser } from "../../actions/auth";
import SearchIcon from "@mui/icons-material/Search";
import { useHistory } from "react-router-dom";
import { getPosts } from "../../actions/post";
import { getAllProfiles } from "../../actions/profile";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TuneIcon from "@mui/icons-material/Tune";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import { Icon } from "@iconify/react";
const pages = ["Posts", "Dentists", "My Cases", "My Groups"];
const settings = ["Profile", "Dashboard", "Logout"];

const styleFilter = {
  position: "absolute",
  top: "35%",
  left: "80%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
};

const styleMessages = {
  position: "absolute",
  top: "19%",
  left: "73%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  padding: 0,
};

const styleNotifications = {
  position: "absolute",
  top: "17%",
  left: "75%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  padding: 0,
};

const styleProfile = {
  position: "absolute",
  top: "23%",
  left: "81%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
};

const TopBar = ({
  auth,
  logoutUser,
  getPosts,
  post: { posts, loading },
  getAllProfiles,
  profile: { profiles },
}) => {
  const [searchKeyword, setSearchKeyword] = React.useState("");
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  const [filteredProfiles, setFilteredProfiles] = React.useState([]);
  const [showResults, setShowResults] = React.useState(false);
  const searchBoxRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInsideSearchBox = searchBoxRef?.current?.contains(
        event.target
      );
      const isClickInsideResultsContainer = event?.target?.closest(
        "#topBarSearchResultsContainer"
      );

      if (!isClickInsideSearchBox && !isClickInsideResultsContainer) {
        setShowResults(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setSearchTerm(value);

    // Filter posts and profiles based on search term
    const filteredPosts = posts?.filter((post) =>
      post.postInfo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredProfiles = profiles?.filter(
      (profile) =>
        profile.user &&
        profile.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update state
    setFilteredPosts(filteredPosts);
    setFilteredProfiles(filteredProfiles);
    setShowResults(true);
  };

  //   const filteredPosts = posts?.filter((post) =>
  //   post.postInfo.title.toLowerCase().includes(searchKeyword.toLowerCase())
  // );

  // const filteredProfiles = profiles?.filter(
  //   (profile) =>
  //     profile.user &&
  //     profile.user.name.toLowerCase().includes(searchKeyword.toLowerCase())
  // );

  const history = useHistory();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleUserMenuNavigation = (setting, e) => {
    e.preventDefault();
    if (setting.toLowerCase().trim() === "profile") {
      history.push(`/profile/${auth?.user?._id}`);
    } else if (setting.toLowerCase().trim() === "dashboard") {
      history.push(`/dashboard`);
    } else {
      logoutUser();
      history.push(`/login`);
    }
  };

  const handleUserPagesNavigation = (setting, e) => {
    e.preventDefault();
    if (setting.toLowerCase().trim() === "posts") {
      history.push(`/posts`);
    } else if (setting.toLowerCase().trim() === "dentists") {
      history.push(`/profiles`);
    } else if (setting.toLowerCase().trim() === "my cases") {
      history.push(`/mycases`);
    } else if (setting.toLowerCase().trim() === "my groups") {
      history.push(`/mygroups`);
    } else {
      history.push(`/dashboard`);
    }
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "#BEBEBE",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const [openFilter, setOpenFilter] = React.useState(false);
  const handleOpenFilter = () => setOpenFilter(true);
  const handleCloseFilter = () => setOpenFilter(false);

  const [openMessages, setOpenMessages] = React.useState(false);
  const handleOpenMessages = () => setOpenMessages(true);
  const handleCloseMessages = () => setOpenMessages(false);

  const [openNotifcations, setOpenNotifications] = React.useState(false);
  const handleOpenNotifications = () => setOpenNotifications(true);
  const handleCloseNotifications = () => setOpenNotifications(false);

  const [openProfile, setOpenProfile] = React.useState(false);
  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);

  return (
    <AppBar
      position="static"
      id="topBarContainer"
      style={{ display: auth.isAuthenticated ? "block" : "none" }}
    >
      <Container maxWidth="xl">
        {/* ADVANCED FILTER MODAL */}
        <Modal
          open={openFilter}
          onClose={handleCloseFilter}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleFilter}>
            <div className="FilterPopupContainer">
              <div
                className="FilterPopupContainerTop"
                style={{ background: "#4E9EC6" }}
              >
                <i
                  class="fa-solid fa-bars-staggered"
                  style={{ color: "white" }}
                ></i>
                <h3>Filter</h3>
              </div>
              <div className="FilterPopupContainerBody">
                <div>
                  <h3>Cas :</h3>
                  <Search>
                    <SearchIconWrapper id="searchIconContainer">
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                      id="SearchInputTopBar"
                    />
                  </Search>
                </div>
                <div className="FilterPopupGenderSelect">
                  <h3>Gender :</h3>
                  <input type="radio" />
                  <h4>Male</h4>
                  <input type="radio" />
                  <h4>Female</h4>
                </div>
                <div>
                  <h3>Minimum Age :</h3>
                  <input type="range" />
                </div>
                <div>
                  <h3>Maximum Age :</h3>
                  <input type="range" />
                </div>
                <div>
                  <h3>Category :</h3>
                  <Search>
                    <SearchIconWrapper id="searchIconContainer">
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Type something..."
                      inputProps={{ "aria-label": "search" }}
                      id="SearchInputTopBar"
                    />
                  </Search>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
        {/* ADVANCED FILTER MODAL */}

        {/* Profile MODAL */}
        <Modal
          open={openProfile}
          onClose={handleCloseProfile}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleProfile}>
            <div className="FilterPopupContainer">
              <div
                id="ProfilePopUpItemMyProfile"
                className="ProfilePopUpItem"
                onClick={(e) => {
                  e.preventDefault();
                  history.push(`/profile/${auth?.user?._id}`);
                  handleCloseProfile();
                }}
              >
                <Avatar
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

                <h2>{auth?.user?.name}</h2>
              </div>
              <div className="manageAccountLinkProfileOptions">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    history.push(`/dashboard`);
                    handleCloseProfile();
                  }}
                >
                  Manage Your Account
                </a>
              </div>
              <Divider style={{ borderColor: "#4e9ec6" }} />
              {/* <div
                className="ProfilePopUpItem"
                id="ProfilePopUpItemManageProfile"
                onClick={(e) => {
                  e.preventDefault();
                  history.push(`/dashboard`);
                  handleCloseProfile();
                }}
              >
                <AccountCircleIcon />

                <h3>Manage Account</h3>
              </div> */}
              <div className="profilePopupOptionsContainer">
                <div
                  className="ProfilePopUpItem"
                  id="ProfilePopUpItemLogOut"
                  onClick={(e) => {
                    e.preventDefault();

                    history.push(`/posts`);
                    handleCloseProfile();
                  }}
                >
                  <Icon icon="pajamas:doc-new" />
                  <h3>Create a new post</h3>
                </div>
                <div
                  className="ProfilePopUpItem"
                  id="ProfilePopUpItemLogOut"
                  onClick={(e) => {
                    e.preventDefault();

                    history.push(`/posts`);
                    handleCloseProfile();
                  }}
                >
                  <Icon icon="material-symbols:help-outline" />
                  <h3>Help And Support</h3>
                </div>
                <div
                  className="ProfilePopUpItem"
                  id="ProfilePopUpItemLogOut"
                  onClick={(e) => {
                    e.preventDefault();

                    history.push(`/posts`);
                    handleCloseProfile();
                  }}
                >
                  <Icon icon="ic:outline-privacy-tip" />
                  <h3>Privacy Policy</h3>
                </div>
                <div
                  className="ProfilePopUpItem"
                  id="ProfilePopUpItemLogOut"
                  onClick={(e) => {
                    e.preventDefault();

                    history.push(`/posts`);
                    handleCloseProfile();
                  }}
                >
                  <Icon icon="ion:settings-outline" />
                  <h3>Settings</h3>
                </div>

                <div
                  className="ProfilePopUpItem"
                  id="ProfilePopUpItemLogOut"
                  onClick={(e) => {
                    e.preventDefault();
                    logoutUser();
                    history.push(`/login`);
                    handleCloseProfile();
                  }}
                >
                  <Icon icon="ant-design:logout-outlined" />
                  <h3>Log Out</h3>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
        {/* PROFILE MODAL */}

        {/* Messages MODAL */}
        <Modal
          open={openMessages}
          onClose={handleCloseMessages}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleMessages}>
            <div className="MessagesPopupContainer">
              <div className="SingleMessageContainer">
                <div className="leftSideMessageContainer">
                  <h4>Fahmi</h4>
                  <p>Hello Dave, did you see the...</p>
                  <p class="message-date"> a day ago </p>
                </div>
                <div className="rightSideMessageContainer">
                  <Avatar
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
                </div>
              </div>
              <Divider style={{ borderColor: "#aaa" }} />
              <div className="SingleMessageContainer">
                <div className="leftSideMessageContainer">
                  <h4>Mark</h4>
                  <p>Hi Dave, can you send the link...</p>
                  <p class="message-date"> 2 days ago </p>
                </div>
                <div className="rightSideMessageContainer">
                  <Avatar
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
                </div>
              </div>
            </div>
          </Box>
        </Modal>
        {/* MESSAGES MODAL */}

        {/* Notifications MODAL */}
        <Modal
          open={openNotifcations}
          onClose={handleCloseNotifications}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleNotifications}>
            <div className="MessagesPopupContainer">
              <div className="SingleMessageContainer">
                <div className="leftSideMessageContainer">
                  <div className="notificationsText">
                    <h4>Fahmi </h4>
                    <p> commented on your post</p>
                  </div>

                  <p class="message-date"> a day ago </p>
                </div>
                <div className="rightSideMessageContainer">
                  <Avatar
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
                </div>
              </div>
              <Divider style={{ borderColor: "#aaa" }} />
              <div className="SingleMessageContainer">
                <div className="leftSideMessageContainer">
                  <div className="notificationsText">
                    <h4>Mark </h4>
                    <p> liked your post</p>
                  </div>

                  <p class="message-date"> 2 days ago </p>
                </div>
                <div className="rightSideMessageContainer">
                  <Avatar
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
                </div>
              </div>
            </div>
          </Box>
        </Modal>
        {/* Notifications MODAL */}

        <Toolbar id="topBarToolbarContainer" disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/posts"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img id="logoDentistup" src={logoDentistup} alt="logoDentistup" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    key={page}
                    onClick={(e) => {
                      handleCloseUserMenu();
                      handleUserPagesNavigation(page, e);
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={(e) => { handleCloseUserMenu(); handleUserMenuNavigation(page, e); }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
            <Search>
              <SearchIconWrapper id="searchIconContainer">
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                id="SearchInputTopBar"
                value={searchTerm}
                onChange={handleSearch}
                ref={searchBoxRef}
                autoFocus
              />
            </Search>

            {filteredPosts.length === 0 &&
              filteredProfiles.length === 0 &&
              showResults && (
                <div id="topBarSearchResultsContainer">
                  <ul>
                    <li>No results found...</li>
                  </ul>
                </div>
              )}

            {(filteredPosts.length > 0 || filteredProfiles.length > 0) &&
              showResults && (
                <div id="topBarSearchResultsContainer">
                  <ul>
                    {filteredPosts.map((post) => (
                      <li key={post._id} className="postSearchResultTopBar">
                        <Link to={`/posts/${post._id}`}>
                          <span>
                            {" "}
                            <Icon icon="system-uicons:thread" />
                          </span>
                          {post.postInfo.title}{" "}
                        </Link>
                      </li>
                    ))}
                    {filteredProfiles.map((profile) => (
                      <li key={profile._id}>
                        {" "}
                        <Link to={`/profile/${profile.user._id}`}>
                          <span>
                            {" "}
                            <img
                              className="round-img my-1"
                              src={
                                profile.profileImage
                                  ? `${
                                      process.env.REACT_APP_BASE_URL +
                                      "/" +
                                      profile.profileImage
                                    }`
                                  : profile.avatar
                              }
                              alt="dentistUpProfilePicture"
                            />
                          </span>
                          {profile.user.name}{" "}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            className="topBarIcons"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <IconButton
              onClick={handleOpenFilter}
              size="large"
              aria-label="Filter Search"
            >
              <Badge color="error">
                <TuneIcon />
              </Badge>
            </IconButton>
            <IconButton
              onClick={handleOpenMessages}
              size="large"
              aria-label="show 1 new mails"
            >
              <Badge badgeContent={2} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              onClick={handleOpenNotifications}
              size="large"
              aria-label="show 2 new notifications"
            >
              <Badge badgeContent={2} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                // onClick={handleOpenUserMenu}
                onClick={handleOpenProfile}
                sx={{ p: 0 }}
                className="topBarImgContainer"
              >
                <Avatar
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
                <i
                  class="fa-solid fa-caret-down"
                  style={{ color: "#4E9EC6" }}
                ></i>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={(e) => {
                    handleCloseUserMenu();
                    handleUserMenuNavigation(setting, e);
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
TopBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
  profile: state.profile,
});
export default connect(mapStateToProps, {
  logoutUser,
  getPosts,
  getAllProfiles,
})(TopBar);
