import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost } from '../../store/actions/postActions';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import Bounce from 'react-reveal/Bounce';

const Post = ({ getPost, post: { post, loading }, match, change }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [change, getPost, match]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <div className="post-disc text-center">
      <Bounce duration={1000} right>
        <PostItem post={post} showActions={false} />
      </Bounce>
      <Bounce delay={200} duration={1000} left>
        <CommentForm postId={post._id} />
      </Bounce>
      <div className="comments">
        {post.comments.map((comment, i) => (
          <Bounce key={i} delay={200 * i} duration={1200} bottom>
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          </Bounce>
        ))}
      </div>
      <Bounce delay={1000} duration={1000}>
        <Link to="/posts" className="btn btn-light">
          Back to posts
        </Link>
      </Bounce>
    </div>
  );
};

const mapStateToProps = state => ({
  post: state.post,
  change: state.post.change
});

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
