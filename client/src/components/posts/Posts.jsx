import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../store/actions/postActions';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import LightSpeed from 'react-reveal/LightSpeed';
import Bounce from 'react-reveal/Bounce';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return loading && posts ? (
    <Spinner />
  ) : (
    <div className="posts-wrapper text-center">
      <LightSpeed left>
        <h1 className="text-primary">Posts</h1>
      </LightSpeed>
      <LightSpeed delay={300} right>
        <p className="lead">
          <i className="fas fa-users" /> Welcome to our community!
        </p>
      </LightSpeed>
      <Bounce delay={500} top>
        <PostForm />
      </Bounce>
      <div className="posts">
        {posts.map((p, i) => (
          <Bounce key={i} delay={250 * i} bottom>
            <PostItem key={p._id} post={p} />
          </Bounce>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  post: state.post
});

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
