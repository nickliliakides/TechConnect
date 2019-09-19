import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/authActions';
import TextFieldGroup from '../common/textFieldGroup';
import Fade from 'react-reveal/Fade';

const Login = ({ loginUser, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    loginUser(email, password);
  };
  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="login">
      <div className="container login-wrapper">
        <div className="row">
          <Fade duration={1600}>
            <div className="col-md-8 m-auto">
              <h1 className="auth display-4 text-center">Sign In</h1>
              <p className="lead text-center">
                Sign into your Tech.Connect account
              </p>
              <form onSubmit={handleSubmit}>
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleChange}
                  required
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
              <p className="my-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
