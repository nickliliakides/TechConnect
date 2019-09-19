import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { createEditExperience } from '../../store/actions/profileActions';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';

const AddExperience = ({ createEditExperience, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

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
    createEditExperience(formData, history);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <Fade duration={1600}>
      <div className="add-experience">
        <h1 className="large text-center text-primary mb-3">
          Add An Experience
        </h1>
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
              disabled={toDisabled ? true : false}
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

AddExperience.propTypes = {
  createEditExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { createEditExperience }
)(withRouter(AddExperience));
