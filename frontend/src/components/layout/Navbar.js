import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/auth";
import logoDentistup from "../../img/logoDentistup.png";
import { NavLink } from "react-router-dom";
import { getProfileById } from "../../actions/profile";
import Spinner from "../layout/Spinner";
const Navbar = ({ auth: { isAuthenticated, loading }, logoutUser, auth }) => {
  const authLinks = (
    <ul>
      <li>
        <NavLink to="/posts" activeClassName="active">
          <i class="fa-solid fa-rocket"></i>{" "}
          <span className="hide-sm">Feed</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/profiles" activeClassName="active">
          <i className="fas fa-user-friends"></i>{" "}
          <span className="hide-sm">Dentists</span>
        </NavLink>
      </li>

      {/* <li>
        <NavLink to="/groups" activeClassName="active">
          <i className="far fa-comments"></i>{" "}
          <span className="hide-sm">Groups</span>
        </NavLink>
      </li> */}
      {/* <li>
        <NavLink to={`/profile/${auth?.user?._id}`} activeClassName="active">
          <i className="fa fa-user"></i>{" "}
          <span className="hide-sm">Profile</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard" activeClassName="active">
          <i className="fas fa-address-card"></i>{" "}
          <span className="hide-sm">Profile Dashboard</span>
        </NavLink>
      </li> */}
      {/* <li>
        <a onClick={logoutUser} href="/login">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li> */}
    </ul>
  );

  const guestLinks = (
    <ul>
      {/* <li>
        <NavLink to="/posts" activeClassName="active">
          Posts
        </NavLink>
      </li>
      <li>
        <NavLink to="/profiles" activeClassName="active">
          Dentists
        </NavLink>
      </li> */}
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
      <p>PERSONAL NAVIGATOR</p>
      <li>
        <NavLink to="/savedposts" activeClassName="active">
          <i class="fa-solid fa-bookmark"></i>{" "}
          <span className="hide-sm">Saved Cases</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/mycases" activeClassName="active">
          <i className="fas fa-question"></i>{" "}
          <span className="hide-sm">My Cases</span>
        </NavLink>
      </li>
      {/* <li>
        <NavLink to="/mygroups" activeClassName="active">
          <i className="far fa-comments"></i>{" "}
          <span className="hide-sm">My Groups</span>
        </NavLink>
      </li> */}
      {/* <li>
        <NavLink to="/mycases" activeClassName="active">
          <i className="far fa-thumbs-up"></i>{" "}
          <span className="hide-sm">My Cases</span>
        </NavLink>
      </li> */}
    </ul>
  );

  return loading && auth === null ? (
    <Spinner />
  ) : (
    <div>
      <nav className="navbar">
        <h1>
          <Link to="/">
            {/* <i className="fas fa-code"></i>  DentistUp */}
            {/* <img id="logoDentistup" src={logoDentistup} alt="logoDentistup"/> */}
          </Link>
        </h1>
        {/* if not loading and authenticated show logged in navbar links else guest links */}
        <p>MENU</p>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}

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
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
