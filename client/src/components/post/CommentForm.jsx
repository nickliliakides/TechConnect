import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../store/actions/postActions';
import Fade from 'react-reveal/Fade';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Write your comment"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <Fade delay={1200}>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </Fade>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);
