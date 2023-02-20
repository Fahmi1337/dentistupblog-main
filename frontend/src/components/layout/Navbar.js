import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/auth";
import logoDentistup from "../../img/logoDentistup.png";

const Navbar = ({ auth: { isAuthenticated, loading }, logoutUser }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          <i className="fas fa-user-friends"></i>{" "}
          <span className="hide-sm">Dentists</span>
        </Link>
      </li>
      <li>
        <Link to="/posts">
          <i className="fas fa-file-alt"></i>{" "}
          <span className="hide-sm">Posts</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-address-card"></i>{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
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
        <Link to="/profiles">Dentists</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  const personalNavLinks = (
    <ul>
      <li>
        <Link to="/">
          <i class="fas fa-question"></i>{" "}
          <span className="hide-sm">My Questions</span>
        </Link>
      </li>
      <li>
        <Link to="/">
          <i class="far fa-comments"></i>{" "}
          <span className="hide-sm">My Groups</span>
        </Link>
      </li>
      <li>
        <Link to="/">
          <i class="far fa-thumbs-up"></i>{" "}
          <span className="hide-sm">My Cases</span>
        </Link>
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
