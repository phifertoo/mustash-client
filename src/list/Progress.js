import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const Access = ({ currentStep }) => {
  return (
    <div className='sidenav'>
      <a href='#' className='mt-3'>
        Type
      </a>
      <a href='#'>Size</a>
      <a href='#'>Address</a>
      <a href='#'>Content</a>
      <a href='#'>Frequency</a>
      <a href='#'>Access</a>
      <a href='#'>Title/Description</a>
      <a href='#'>Price</a>
      <a href='#'>Upload Images</a>
      <a href='#'>Summary</a>
    </div>
  );
};

Access.propTypes = {
  currentStep: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currentStep: state.space.currentStep,
});

export default connect(mapStateToProps, {})(Access);
