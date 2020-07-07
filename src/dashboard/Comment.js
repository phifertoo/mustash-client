import React from 'react';
import PropTypes from 'prop-types';
// import Moment from 'react-moment';
import { connect } from 'react-redux';

const Comment = ({ comment }) => {
  return (
    <div className='comment-container p-1 my-1'>
      <div>
        <img className='round-img' src={comment.avatarString} alt='' />
        <p className='comment-name'>{comment.name}</p>
      </div>
      <div>
        <p className='my-1 post-text mb-4'>{comment.comment}</p>
        <p className='comment-date'>
          {' '}
          Posted on: {comment.date}
          {/* <Moment format='YYYY/MM/DD'>{comment.date}</Moment> */}
        </p>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Comment);
