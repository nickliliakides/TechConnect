import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Zoom from 'react-reveal/Zoom';
import Bounce from 'react-reveal/Bounce';
import Flip from 'react-reveal/Flip';

const Landing = ({ auth: { isAuthenticated } }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container landing-wrapper">
          <div className="row">
            <div className="col-md-12 text-center">
              <Zoom duration={2000} top>
                <h1 className="display-3 logo mb-4">tech.connect</h1>
              </Zoom>
              <Bounce delay={1600}>
                <p className="lead">
                  {' '}
                  Create a profile/portfolio, share posts, interests and get
                  connect to other 'tech' people and developers around the
                  world.
                </p>
              </Bounce>
              <hr />
              <div className="intro-btn">
                <Flip delay={1200} duration={1200} top>
                  <Link to="/register" className="btn btn-lg btn-info mr-2">
                    Sign Up
                  </Link>
                </Flip>
                <Flip delay={1200} duration={1200} bottom>
                  <Link to="/login" className="btn btn-lg btn-light">
                    Login
                  </Link>
                </Flip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Landing);
