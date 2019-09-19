import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deleteExperience } from '../../store/actions/profileActions';
import { connect } from 'react-redux';
import Moment from 'react-moment';

const expStyle = {
  display: 'flex',
  alignItems: 'center'
};

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map(exp => (
    <tr key={exp._id}>
      <td className="text-center">{exp.company}</td>
      <td className="hide-sm text-center">{exp.title}</td>
      <td className="text-center">
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
        {exp.to === null ? (
          'Current Position'
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td style={expStyle}>
        <Link
          className="edit-button"
          to={{ pathname: '/edit-experience', state: { id: exp._id } }}
        >
          <i className="fas fa-edit" /> Edit
        </Link>
        <button
          onClick={() => {
            if (
              window.confirm('Are you sure you want to delete your experience?')
            ) {
              deleteExperience(exp._id);
              document.body.scrollTop = 0; // For Safari
              document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            }
          }}
          className="delete-button"
        >
          <i className="fas fa-trash-alt" /> Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-3">Experience</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="text-center">Company</th>
            <th className="hide-sm text-center">Title</th>
            <th className="text-center">Years</th>
            <th />
          </tr>
        </thead>
        <tbody style={{ expStyle }}>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
