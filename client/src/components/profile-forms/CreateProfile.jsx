import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { createEditProfile } from '../../store/actions/profileActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';

const CreateProfile = ({ createEditProfile, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const [displaySocial, toggleSocial] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    createEditProfile(formData, history);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <Fade duration={1600}>
      <div className="create-profile">
        <h1 className="large text-primary text-center mb-3">
          Create Your Profile
        </h1>
        <p className="lead text-center">
          <i className="fas fa-user" /> Let's get some information to make your
          profile stand out
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={e => handleSubmit(e)}>
          <div className="form-group">
            <select
              name="status"
              value={status}
              onChange={e => handleChange(e)}
              required
            >
              <option value="">* Select Professional Status</option>
              <option value="Front-End Developer">Front-End Developer</option>
              <option value="Back-End Developer">Back-End Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Head/Lead Developer">Head/Lead Developer</option>
              <option value="Technician/Technical Support">
                Technician/Technical Support
              </option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <small className="form-text">
              Give us an idea of where you are at in your career
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Company"
              name="company"
              value={company}
              onChange={e => handleChange(e)}
            />
            <small className="form-text">
              Could be your own company or one you work for
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Website"
              name="website"
              value={website}
              onChange={e => handleChange(e)}
            />
            <small className="form-text">
              Could be your own or a company website
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={e => handleChange(e)}
            />
            <small className="form-text">
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Skills"
              name="skills"
              value={skills}
              onChange={e => handleChange(e)}
              required
            />
            <small className="form-text">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Github Username"
              name="githubusername"
              value={githubusername}
              onChange={e => handleChange(e)}
            />
            <small className="form-text">
              If you want your latest repos and a Github link, include your
              username
            </small>
          </div>
          <div className="form-group">
            <textarea
              placeholder="A short bio of yourself"
              name="bio"
              value={bio}
              onChange={e => handleChange(e)}
            />
            <small className="form-text">Tell us a little about yourself</small>
          </div>

          <div className="my-2">
            <button
              onClick={() => toggleSocial(!displaySocial)}
              type="button"
              className="btn btn-light"
            >
              Add Social Network Links
            </button>
            <span>
              <small> Optional</small>
            </span>
          </div>

          {displaySocial && (
            <Fragment>
              <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x" />
                <input
                  type="url"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={twitter}
                  onChange={e => handleChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x" />
                <input
                  type="url"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={e => handleChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x" />
                <input
                  type="url"
                  placeholder="YouTube URL"
                  name="youtube"
                  value={youtube}
                  onChange={e => handleChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x" />
                <input
                  type="url"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  value={linkedin}
                  onChange={e => handleChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x" />
                <input
                  type="url"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={instagram}
                  onChange={e => handleChange(e)}
                />
              </div>
            </Fragment>
          )}

          <input
            type="submit"
            onSubmit={e => handleSubmit(e)}
            className="btn btn-primary my-1"
          />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </div>
    </Fade>
  );
};

CreateProfile.propTypes = {
  createEditProfile: PropTypes.func.isRequired
};

export default connect(
  null,
  { createEditProfile }
)(withRouter(CreateProfile));
