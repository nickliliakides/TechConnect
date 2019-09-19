import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../store/actions/profileActions';
import ProfileItem from './ProfileItem';
import Fade from 'react-reveal/Fade';

const ProfileList = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className="profiles text-center">
          <Fade left>
            <h1 className="large text-primary">Tech Professionals</h1>
          </Fade>
          <Fade right>
            <p className="lead">
              <i className="fab fa-connectdevelop" /> Browse and connect with
              professionals
            </p>
          </Fade>
          <div className="profile-list">
            {profiles.length > 0 ? (
              profiles.map((pro, i) => (
                <Fade key={i} left delay={250 * i}>
                  {' '}
                  <ProfileItem key={pro._id} profile={pro} />
                </Fade>
              ))
            ) : (
              <h4>There are no profiles to display</h4>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  profile: state.profile
});

ProfileList.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profiles: PropTypes.object
};

export default connect(
  mapStateToProps,
  { getProfiles }
)(ProfileList);
