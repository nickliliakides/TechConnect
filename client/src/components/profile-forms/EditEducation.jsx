import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {
  createEditEducation,
  getCurrentProfile
} from '../../store/actions/profileActions';
import { setAlert } from '../../store/actions/alertActions';
import { connect } from 'react-redux';
import moment from 'moment';
import Fade from 'react-reveal/Fade';

const EditEducation = ({
  createEditEducation,
  getCurrentProfile,
  profile: { profile, loading },
  history,
  location: {
    state: { id }
  }
}) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    field: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  useEffect(() => {
    getCurrentProfile();
    // Get update index
    const index = profile.education.map(edu => edu._id).indexOf(id);

    if (index === -1) {
      setAlert('Education not found', 'danger');
      history.push('/dashboard');
    }

    setFormData({
      school:
        loading || !profile.education[index].school
          ? ''
          : profile.education[index].school,
      degree:
        loading || !profile.education[index].degree
          ? ''
          : profile.education[index].degree,
      field:
        loading || !profile.education[index].field
          ? ''
          : profile.education[index].field,
      from:
        loading || !profile.education[index].from
          ? ''
          : moment(profile.education[index].from).format('YYYY-MM-DD'),
      to:
        loading || !profile.education[index].to
          ? ''
          : moment(profile.education[index].to).format('YYYY-MM-DD'),
      current:
        loading || !profile.education[index].current
          ? false
          : profile.education[index].current,
      description:
        loading || !profile.education[index].description
          ? ''
          : profile.education[index].description
    });
  }, [getCurrentProfile, history, id, loading ]);

  const [toDisabled, toggleDisabled] = useState(false);

  const { school, degree, field, from, to, current, description } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCurrentChange = () => {
    setFormData({ ...formData, current: !current });
    toggleDisabled(!toDisabled);
  };

  const handleSubmit = e => {
    e.preventDefault();
    createEditEducation(formData, history, true, id);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <Fade duration={1600}>
      <div className="add-education">
        <h1 className="large text-center text-primary mb-3">Edit Education</h1>
        <p className="lead text-center">
          <i className="fas fa-code-branch" /> Add any degrees that you had in
          the past or your current studies.
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={e => handleSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="* University/School"
              name="school"
              value={school}
              onChange={e => handleChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Degree"
              name="degree"
              value={degree}
              onChange={e => handleChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Field of studies"
              name="field"
              value={field}
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
              Current Studies
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
              placeholder="Course Description"
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

EditEducation.propTypes = {
  createEditEducation: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { createEditEducation, getCurrentProfile, setAlert }
)(withRouter(EditEducation));
