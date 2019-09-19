import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import {
  deleteComment,
  addCommentLike,
  removeCommentLike
} from '../../store/actions/postActions';
import Fade from 'react-reveal/Fade';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date, likes },
  auth,
  deleteComment,
  addCommentLike,
  removeCommentLike
}) => (
  <div className="post bg-white p-1 my-1">
    <div className="post-img">
      <Link to={`/profile/${user}`}>
        <Fade delay={1000}>
          <img className="post-round-img" src={avatar} alt="avatar" />
        </Fade>
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on <Moment format="dddd DD of MMMM YYYY">{date}</Moment>
      </p>
      <button
        onClick={() => addCommentLike(postId, _id)}
        type="button"
        className="btn btn-light"
      >
        <i className="fas fa-thumbs-up" />{' '}
        {likes.length > 0 && <span>{likes.length}</span>}
      </button>
      <button
        onClick={() => removeCommentLike(postId, _id)}
        type="button"
        className="btn btn-light"
      >
        <i className="fas fa-thumbs-down" />
      </button>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={() => {
            if (
              window.confirm('Are you sure you want to delete your comment?')
            ) {
              deleteComment(postId, _id);
            }
          }}
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-times" />
        </button>
      )}
    </div>
  </div>
);

const mapStateToProps = state => ({
  auth: state.auth
});

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  addCommentLike: PropTypes.func.isRequired,
  removeCommentLike: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { deleteComment, addCommentLike, removeCommentLike }
)(CommentItem);
