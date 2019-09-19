import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Zoom from 'react-reveal/Zoom';
import Bounce from 'react-reveal/Bounce';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => (
  <Zoom delay={700}>
    <div className="profile-about bg-light p-3">
      {bio && (
        <Bounce delay={1000} left>
          <Fragment>
            <h2 className="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
            <p>{bio}</p>
            <div className="line" />
          </Fragment>
        </Bounce>
      )}
      <Bounce delay={1000} right>
        <h2 className="text-primary">Skill Set</h2>
        <div className="skills">
          {skills.map((skill, i) => (
            <div key={i} className="p-1">
              <i className="fas fa-check" /> {skill}
            </div>
          ))}
        </div>
      </Bounce>
    </div>
  </Zoom>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
