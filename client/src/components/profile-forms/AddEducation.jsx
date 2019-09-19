import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { createEditEducation } from '../../store/actions/profileActions';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';

const AddEducation = ({ createEditEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    field: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

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
    createEditEducation(formData, history);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <Fade duration={1600}>
      <div className="add-education">
        <h1 className="large text-center text-primary mb-3">
          Add An Education
        </h1>
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
              required
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
              disabled={toDisabled ? true : false}
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

AddEducation.propTypes = {
  createEditEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { createEditEducation }
)(withRouter(AddEducation));
