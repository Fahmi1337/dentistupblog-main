import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/auth";
import Register from "./Register";
import dentistupLogo from "../../img/logoDentistup.png";
const Login = ({ loginUser, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Destructure Form Data
  const { email, password } = formData;
  // to enable the change of state of Form Data
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  // when submitting the form data
  const onSubmit = async (e) => {
    e.preventDefault();
    loginUser(email, password);
  };
  const [showLogin, setShowLogin] = useState(true);
  // Redirect if successfully login
  if (isAuthenticated) {
    return <Redirect to="/posts" />;
  }

  return (
    <Fragment>
      <div className="loginRegisterParentContainer">
        <div className="loginRegisterContainerLeft">
          <div>
            <img
              src={dentistupLogo}
              alt="dentistupLogo"
              style={{ width: "15em", marginBottom: "1em" }}
            />
          </div>
          <h2>Connect, collaborate, and gain insights.</h2>
          <h2> Join our dental community today!</h2>
        </div>
        <div className="loginRegisterContainerRight">
          {showLogin ? (
            <div>
              <h1 className="large text-primary">Sign In</h1>
              <p className="lead">
                <i className="fas fa-user"></i> Login Into Your Account
              </p>
              <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value={password}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Login"
                />
              </form>
              {/* <p className="my-1">
        Don't have an account? <Link to="/register">Register</Link>
      </p> */}
              <div>
                <p className="my-1">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      setShowLogin(false);
                      e.preventDefault();
                    }}
                  >
                    Register
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div>
              <Register />

              <div>
                <p className="my-1">
                  Already have an account?{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      setShowLogin(true);
                      e.preventDefault();
                    }}
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

loginUser.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser })(Login);
