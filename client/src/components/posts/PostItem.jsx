import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import {
  addPostLike,
  removePostLike,
  deletePost
} from '../../store/actions/postActions';
import Fade from 'react-reveal/Fade';

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
  auth,
  addPostLike,
  removePostLike,
  deletePost,
  showActions
}) => (
  <div className="post bg-white p-1 my-1">
    <div className="post-img">
      <Link to={`/profile/${user}`}>
        <Fade delay={1000}>
          <img className="post-round-img" src={avatar} alt="user-avatar" />
        </Fade>
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on <Moment format="dddd DD of MMMM YYYY">{date}</Moment>
      </p>
      <Fragment>
        <button
          onClick={() => addPostLike(_id)}
          type="button"
          className="btn btn-light mb-2"
        >
          <i className="fas fa-thumbs-up" />{' '}
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>
        <button
          onClick={() => removePostLike(_id)}
          type="button"
          className="btn btn-light mb-2"
        >
          <i className="fas fa-thumbs-down" />
        </button>
        {showActions && (
          <Link to={`/post/${_id}`} className="btn btn-primary mb-2">
            Discusion{' '}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
        )}
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => {
              if (
                window.confirm('Are you sure you want to delete your post?')
              ) {
                deletePost(_id);
              }
            }}
            type="button"
            className="btn btn-danger mb-2"
          >
            <i className="fas fa-times" />
          </button>
        )}
      </Fragment>
    </div>
  </div>
);

const mapStateToProps = state => ({
  auth: state.auth
});

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addPostLike: PropTypes.func.isRequired,
  removePostLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool.isRequired
};

PostItem.defaultProps = {
  showActions: true
};

export default connect(
  mapStateToProps,
  { addPostLike, removePostLike, deletePost }
)(PostItem);
