import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../store/actions/alertActions';
import { registerUser } from '../../store/actions/authActions';
import TextFieldGroup from '../common/textFieldGroup';
import Fade from 'react-reveal/Fade';

const Register = ({ setAlert, registerUser, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { name, email, password, confirmPassword } = formData;

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert("Passwords don't match", 'danger');
    } else {
      registerUser({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="register">
      <div className="container register-wrapper">
        <div className="row">
          <Fade duration={1600}>
            <div className="col-md-8 m-auto">
              <h1 className="auth display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your Tech-Connect account
              </p>
              <form onSubmit={handleSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  info="This site uses Gravatar so if you want a profile image, use
                    a Gravatar email."
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleChange}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={handleChange}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
              <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

export default connect(
  mapStateToProps,
  { setAlert, registerUser }
)(Register);
