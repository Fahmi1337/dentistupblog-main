import * as React from 'react';
import { useEffect} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logoDentistup from "../../img/logoDentistup.png";
import { styled, alpha } from '@mui/material/styles';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InputBase from '@mui/material/InputBase';
import { logoutUser } from "../../actions/auth";
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPosts } from "../../actions/post";
import { getAllProfiles } from "../../actions/profile";
import { Link } from "react-router-dom";
const pages = ['Posts', 'Dentists', 'My Questions', 'My Groups'];
const settings = ['Profile', 'Dashboard', 'Logout'];

const TopBar = ({
   auth,
   logoutUser,
   getPosts, post: { posts, loading },
   getAllProfiles, profile: { profiles }
  }) => {
    const [searchKeyword, setSearchKeyword] = React.useState("");
    useEffect(() => {
      getPosts();
    }, [getPosts]);
    useEffect(() => {
      getAllProfiles();
    }, [getAllProfiles]);




    const [searchTerm, setSearchTerm] = React.useState('');
    const [filteredPosts, setFilteredPosts] = React.useState([]);
    const [filteredProfiles, setFilteredProfiles] = React.useState([]);
    const [showResults, setShowResults] = React.useState(false);
    const searchBoxRef = React.useRef(null);



    useEffect(() => {
      const handleClickOutside = (event) => {
        const isClickInsideSearchBox = searchBoxRef.current.contains(event.target);
        const isClickInsideResultsContainer = event.target.closest('#topBarSearchResultsContainer');
  
        if (!isClickInsideSearchBox && !isClickInsideResultsContainer) {
          setShowResults(false);
        }
      };
  
      document.addEventListener('click', handleClickOutside);
  
      return () => {
        document.removeEventListener('click', handleClickOutside);
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


console.log("filteredPosts??", filteredPosts);
console.log("filteredProfiles??", filteredProfiles)













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
const handleUserMenuNavigation = (setting, e) =>{
    e.preventDefault();
    if(setting.toLowerCase().trim()==="profile"){
        history.push(`/profile/${auth?.user?._id}`)
    }
    else if(setting.toLowerCase().trim()==="dashboard"){
        history.push(`/dashboard`)
    }
    else{
        logoutUser();
        history.push(`/login`)
    }
  
}

const handleUserPagesNavigation = (setting, e) =>{
  e.preventDefault();
  if(setting.toLowerCase().trim()==="posts"){
      history.push(`/posts`)
  }
  else if(setting.toLowerCase().trim()==="dentists"){
      history.push(`/profiles`)
  }
  else if(setting.toLowerCase().trim()==="my questions"){
    history.push(`/myquestions`)
}
else if(setting.toLowerCase().trim()==="my groups"){
  history.push(`/mygroups`)
}
  else{
      
      history.push(`/dashboard`)
  }

}

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#BEBEBE',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));





  // Define the FormComponent outside of your useForm hook
const FormComponent = ({ setState, state, label }) => (
  <form>
    <label htmlFor={label}>
      {label}
      <input
        type="text"
        id={label}
        value={state}
        placeholder={label}
        onChange={e => setState(e.target.value)}
      />
    </label>
  </form>
);

  return (
    <AppBar position="static" id="topBarContainer">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/posts"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
             <img id="logoDentistup" src={logoDentistup} alt="logoDentistup"/>
          </Typography>
   
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"
                   key={page}
                   onClick={(e) => { handleCloseUserMenu(); handleUserPagesNavigation(page, e); }}
                  >{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
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
              inputProps={{ 'aria-label': 'search' }}
              id="SearchInputTopBar"
              value={searchTerm} onChange={handleSearch}
              ref={searchBoxRef}
              autoFocus
            />
          </Search>
          {(filteredPosts.length > 0 ||  filteredProfiles.length > 0) && showResults &&
          
          <div id="topBarSearchResultsContainer">
          <ul> 
        {filteredPosts.map((post) => (
          <li key={post._id} >  <Link to={`/posts/${post._id}`}>
       {post.postInfo.title}
        </Link></li>
        ))}
        {filteredProfiles.map((profile) => (
          <li key={profile._id}> <Link to={`/profile/${profile.user._id}`}>
          {profile.user.name} 
        </Link></li>
        ))}
      </ul>
          </div>

          }
         
        
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Dentistup"    src={auth?.user?.profileImage ? `${process.env.REACT_APP_BASE_URL +"/" + auth?.user?.profileImage}` : auth?.user?.avatar}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={(e) => { handleCloseUserMenu(); handleUserMenuNavigation(setting, e); }}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
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
  export default connect(mapStateToProps, { logoutUser, getPosts, getAllProfiles })(TopBar);