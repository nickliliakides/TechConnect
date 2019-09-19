import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGitRepos } from '../../store/actions/profileActions';
import Spinner from '../layout/Spinner';
import LightSpeed from 'react-reveal/LightSpeed';

const ProfileGithub = ({ username, repos, getGitRepos }) => {
  useEffect(() => {
    getGitRepos(username);
  },[getGitRepos, username]);
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github" /> Github Repos
      </h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo, i) => (
          <LightSpeed key={i} delay={200 * i} left>
            <div key={i} className="repo bg-white pr-2 pt-3 my-1">
              <div className="ml-3">
                <h4>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div>
                <ul className="gitlist">
                  <li className="badge badge-primary">
                    Stars: {repo.stargazers_count}
                  </li>
                  <li className="badge badge-dark">
                    Watchers: {repo.watchers_count}
                  </li>
                  <li className="badge badge-light">
                    Forks: {repo.forks_count}
                  </li>
                </ul>
              </div>
            </div>
          </LightSpeed>
        ))
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  repos: state.profile.repos
});

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired,
  getGitRepos: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getGitRepos }
)(ProfileGithub);
