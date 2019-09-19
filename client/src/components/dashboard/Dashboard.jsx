import React, { useEffect, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getCurrentProfile,
  deleteUser
} from '../../store/actions/profileActions';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import Zoom from 'react-reveal/Zoom';
import Flip from 'react-reveal/Flip';

const Dashboard = ({
  getCurrentProfile,
  deleteUser,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    profile !== null && profile.user._id === user._id &&(
      <Fragment>
        <div className="dashboard text-center">
          <div className="dashboard-wrapper">
            <Zoom duration={1200}>
              <h1 className="large text-primary my-3">Dashboard</h1>
            </Zoom>
            <Zoom duration={600} delay={300}>
              <p className="lead">
                <i className="fas fa-user" /> Welcome {user && user.name}
              </p>
            </Zoom>
              <Fragment>
                <DashboardActions />
                <Zoom duration={1500} top>
                  <Experience experience={profile.experience} />
                </Zoom>
                <Zoom duration={1500} delay={200} bottom>
                  <Education education={profile.education} />
                </Zoom>
                <Flip duration={1500} delay={1000} bottom>
                  <div className="my-4 dash-btn">
                  <Link to={`/profile/${profile.user._id}`} className="btn btn-primary">
                  <i className="far fa-eye"></i> View Profile
        </Link>
                    <button
                      className="btn btn-danger del-btn"
                      onClick={() => deleteUser()}
                    >
                      <i className="fas fa-user-slash" /> Delete My Account
                    </button>
                  </div>
                </Flip>
              </Fragment>
          </div>
        </div>  
      </Fragment>
    )
  )
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteUser }
)(Dashboard);



//   <Fragment>
//     <div className="dashboard text-center">
//       <div className="dashboard-wrapper">
//         <Zoom duration={1200}>
//           <h1 className="large text-primary my-3">Dashboard</h1>
//         </Zoom>
//         <Zoom duration={600} delay={300}>
//           <p className="lead">
//             <i className="fas fa-user" /> Welcome {user && user.name}
//           </p>
//         </Zoom>
// <Fragment>
// <p>
//   You haven't set up your profile yet, please do add some
//   information
// </p>
// <Link to="/create-profile" className="btn btn-primary my-1">
//   Create Profile
// </Link>
// </Fragment>
//         </div>
//     </div>
//   </Fragment>


