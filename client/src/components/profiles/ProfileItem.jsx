import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  return (
    <div className="profile bg-light">
      <Zoom delay={700}>
        <img src={avatar} alt="avatar" className="round-img pro-item" />
      </Zoom>
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary ml-3">
          View Profile
        </Link>
      </div>
      <Zoom delay={1000}>
        <ul className="skillist">
          {skills.slice(0, 4).map((skill, i) => (
            <li key={i} className="text-primary">
              <i className="fas fa-cog fa-xs" /> {skill}
            </li>
          ))}
        </ul>
      </Zoom>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
