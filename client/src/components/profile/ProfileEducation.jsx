import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({
  education: { school, degree, field, current, to, from, description }
}) => (
  <div>
    <h3 className="text-dark">{school}</h3>
    <p>
      <Moment format="YYYY/MM/DD">{from}</Moment>
      {current ? (
        ' - current studies'
      ) : (
        <Moment format="YYYY/MM/DD">{to}</Moment>
      )}
    </p>
    <p>
      <strong>Degree: </strong>
      {degree}
    </p>
    <p>
      <strong>Field of study: </strong>
      {field}
    </p>
    <p>
      <strong>Description: </strong>
      {description ? description : ' --- '}
    </p>
  </div>
);

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired
};

export default ProfileEducation;
