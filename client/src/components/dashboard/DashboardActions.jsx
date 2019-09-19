import React from 'react';
import { Link } from 'react-router-dom';
import Flip from 'react-reveal/Flip';

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Flip duration={1600} left>
        <Link to="/edit-profile" className="btn btn-light mb-3">
          <i className="fas fa-user-circle text-primary" /> Edit My Profile
        </Link>
      </Flip>
      <Flip duration={2000} top>
        <Link to="/add-experience" className="btn btn-light mb-3">
          <i className="fab fa-black-tie text-primary" /> Add Experience
        </Link>
      </Flip>
      <Flip duration={1600} right>
        <Link to="/add-education" className="btn btn-light mb-3">
          <i className="fas fa-graduation-cap text-primary" /> Add Education
        </Link>
      </Flip>
    </div>
  );
};

export default DashboardActions;
