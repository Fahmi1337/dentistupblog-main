import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/auth";
import logoDentistup from "../../img/logoDentistup.png";
import { NavLink } from "react-router-dom";
import { getProfileById } from "../../actions/profile";
const Navbar = ({
  auth: { isAuthenticated, loading },
  logoutUser,
  getProfileById,
  profile: { profile },
  match,
}) => {
  useEffect(() => {
    getProfileById(match?.params.id);
  }, [getProfileById, match?.params.id]);

  const authLinks = (
    <ul>
      <li>
        <NavLink to="/profiles" activeClassName="active">
          <i className="fas fa-user-friends"></i>{" "}
          <span className="hide-sm">Dentists</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/posts" activeClassName="active">
          <i className="fas fa-file-alt"></i>{" "}
          <span className="hide-sm">Posts</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard" activeClassName="active">
          <i className="fas fa-address-card"></i>{" "}
          <span className="hide-sm">Dashboard</span>
        </NavLink>
      </li>
      <li>
        <NavLink to={`/profile/${profile?.user?._id}`} activeClassName="active">
          <i className="fa fa-user"></i>{" "}
          <span className="hide-sm">Profile</span>
        </NavLink>
      </li>
      <li>
        <a onClick={logoutUser} href="/login">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <NavLink to="/profiles" activeClassName="active">
          Dentists
        </NavLink>
      </li>
      <li>
        <NavLink to="/register" activeClassName="active">
          Register
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" activeClassName="active">
          Login
        </NavLink>
      </li>
    </ul>
  );

  const personalNavLinks = (
    <ul>
      <li>
        <NavLink to="/myquestions" activeClassName="active">
          <i className="fas fa-question"></i>{" "}
          <span className="hide-sm">My Questions</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/mygroups" activeClassName="active">
          <i className="far fa-comments"></i>{" "}
          <span className="hide-sm">My Groups</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/mycases" activeClassName="active">
          <i className="far fa-thumbs-up"></i>{" "}
          <span className="hide-sm">My Cases</span>
        </NavLink>
      </li>
    </ul>
  );

  return (
    <div>
      <nav className="navbar">
        <h1>
          <Link to="/">
            {/* <i className="fas fa-code"></i>  DentistUp */}
            <img id="logoDentistup" src={logoDentistup} />
          </Link>
        </h1>
        {/* if not loading and authenticated show logged in navbar links else guest links */}
        <p>MENU</p>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
        <p>PERSONAL NAVIGATOR</p>
        {!loading && (
          <Fragment>{isAuthenticated ? personalNavLinks : null}</Fragment>
        )}
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { logoutUser, getProfileById })(Navbar);
