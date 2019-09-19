import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deleteEducation } from '../../store/actions/profileActions';
import { connect } from 'react-redux';
import Moment from 'react-moment';

const eduStyle = {
  display: 'flex',
  alignItems: 'center'
};

const Education = ({ education, deleteEducation }) => {
  const educations = education.map(edu => (
    <tr key={edu._id}>
      <td className="hide-sm text-center">{edu.school}</td>
      <td className="text-center">
        {edu.field} - {edu.degree}
      </td>
      <td className="text-center">
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
        {edu.to === null ? (
          'Current Studies'
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </td>
      <td style={eduStyle}>
        <Link
          className="edit-button"
          to={{ pathname: '/edit-education', state: { id: edu._id } }}
        >
          <i className="fas fa-edit" /> Edit
        </Link>
        <button
          onClick={() => {
            if (
              window.confirm('Are you sure you want to delete your experience?')
            ) {
              deleteEducation(edu._id);
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
      <h2 className="my-3">Education</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="hide-sm text-center">School</th>
            <th className="text-center">Field - Degree</th>
            <th className="text-center">Years</th>
            <th />
          </tr>
        </thead>
        <tbody style={{ eduStyle }}>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
