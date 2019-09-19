import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileById } from '../../store/actions/profileActions';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import Spinner from '../layout/Spinner';
import Flip from 'react-reveal/Flip';

const Profile = ({
  getProfileById,
  match: { params },
  profile: { profile, loading },
  auth
}) => {
  useEffect(() => {
    getProfileById(params.id);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }, [getProfileById, params]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <div className="profile-wrapper">
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <Flip delay={1000} left>
              <div className="profile-exp text-center  bg-white p-2">
                <h2 className="text-primary">Experience</h2>
                {profile.experience.length > 0 ? (
                  <Fragment>
                    {profile.experience.map(exp => (
                      <ProfileExperience key={exp._id} experience={exp} />
                    ))}
                  </Fragment>
                ) : (
                  <h6>No experience added</h6>
                )}
              </div>
            </Flip>
            <Flip delay={1000} right>
              <div className="profile-edu text-center bg-white p-2">
                <h2 className="text-primary">Education</h2>
                {profile.education.length > 0 ? (
                  <Fragment>
                    {profile.education.map(exp => (
                      <ProfileEducation key={exp._id} education={exp} />
                    ))}
                  </Fragment>
                ) : (
                  <h6>No education added</h6>
                )}
              </div>
            </Flip>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
          <Link to="/profiles" className="btn btn-light">
            Back to profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-primary">
                Edit my profile
              </Link>
            )}
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
