import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {
  createEditExperience,
  getCurrentProfile
} from '../../store/actions/profileActions';
import { setAlert } from '../../store/actions/alertActions';
import { connect } from 'react-redux';
import moment from 'moment';
import Fade from 'react-reveal/Fade';

const EditExperience = ({
  createEditExperience,
  getCurrentProfile,
  profile: { profile, loading },
  history,
  location: {
    state: { id }
  },
  setAlert
}) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  useEffect(() => {
    getCurrentProfile();
    // Get update index
    const index = profile.experience.map(exp => exp._id).indexOf(id);

    if (index === -1) {
      setAlert('Experience not found', 'danger');
      history.push('/dashboard');
    }

    setFormData({
      company:
        loading || !profile.experience[index].company
          ? ''
          : profile.experience[index].company,
      title:
        loading || !profile.experience[index].title
          ? ''
          : profile.experience[index].title,
      location:
        loading || !profile.experience[index].location
          ? ''
          : profile.experience[index].location,
      from:
        loading || !profile.experience[index].from
          ? ''
          : moment(profile.experience[index].from).format('YYYY-MM-DD'),
      to:
        loading || !profile.experience[index].to
          ? ''
          : moment(profile.experience[index].to).format('YYYY-MM-DD'),
      current:
        loading || !profile.experience[index].current
          ? false
          : profile.experience[index].current,
      description:
        loading || !profile.experience[index].description
          ? ''
          : profile.experience[index].description
    });
  }, [loading, history, id, getCurrentProfile]);

  const [toDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCurrentChange = () => {
    setFormData({ ...formData, current: !current });
    toggleDisabled(!toDisabled);
  };

  const handleSubmit = e => {
    e.preventDefault();
    createEditExperience(formData, history, true, id);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <Fade duration={1600}>
      <div className="add-experience">
        <h1 className="large text-center text-primary mb-3">Edit Experience</h1>
        <p className="lead text-center">
          <i className="fas fa-code-branch" /> Add any professional experiences
          that you had in the past or your current position.
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={e => handleSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Job Title"
              name="title"
              value={title}
              onChange={e => handleChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Company"
              name="company"
              value={company}
              onChange={e => handleChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input
              type="date"
              name="from"
              value={from}
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <p>
              <input
                type="checkbox"
                checked={current}
                name="current"
                value={current}
                onChange={handleCurrentChange}
              />{' '}
              Current Job
            </p>
          </div>
          <div className="form-group">
            <h4>To Date</h4>
            <input
              type="date"
              name="to"
              value={to}
              onChange={e => handleChange(e)}
              disabled={current ? true : false}
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Job Description"
              value={description}
              onChange={e => handleChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </div>
    </Fade>
  );
};

const mapStateToProps = state => ({
  profile: state.profile
});

EditExperience.propTypes = {
  createEditExperience: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { createEditExperience, getCurrentProfile, setAlert }
)(withRouter(EditExperience));
