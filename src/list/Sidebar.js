import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setStep } from '../actions/list';

export const Sidebar = ({ currentStep, setStep }) => {
  const stage = [
    'Type',
    'Size',
    'Address',
    'Content',
    'Frequency',
    'Access',
    'Title/Description',
    'Price',
    'Upload Images',
    'Summary',
  ];

  const handleClick = (index, currentStep) => {
    if (currentStep >= index) {
      setStep(index);
    }
  };

  return (
    <div className='sidenav'>
      {stage.map((element, index) => (
        <div
          key={index}
          className={
            currentStep >= index
              ? 'sidenav-stage-completed'
              : 'sidenav-stage-uncompleted'
          }
          onClick={() => handleClick(index, currentStep)}
        >
          {element}
        </div>
      ))}
    </div>
  );
};

Sidebar.propTypes = {
  currentStep: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentStep: state.space.currentStep,
});

export default connect(mapStateToProps, { setStep })(Sidebar);
