import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { nextStep, previousStep, setProperty } from '../ducks/list';
import { stepMap } from './stepMap';

export const Frequency = ({
  currentStep,
  nextStep,
  previousStep,
  setProperty,
}) => {
  const [data, setData] = useState({
    monthly: '',
    weekly: '',
    daily: '',
  });

  const [nextButton, setButton] = useState({
    isActive: false,
  });

  const { isActive } = nextButton;

  const initialState = {
    monthly: '',
    weekly: '',
    daily: '',
  };

  const handleClick = (e) => {
    setData({
      ...initialState,
      [e.target.attributes.value.value]: 'active',
    });
    setButton({
      isActive: true,
    });
  };

  const increaseStep = (data, currentStep) => {
    nextStep(currentStep);
    const frequency = Object.keys(data).find(
      (element) => data[element] === 'active'
    );
    setProperty('frequency', frequency);
  };

  return (
    <Fragment>
      {stepMap[currentStep] === 'frequency' && (
        <div className='frequency-component-container'>
          <h4 className='frequency-title'>
            When will renters be able to access their items?
          </h4>
          <div className='frequency-container-outer'>
            <div className='frequency-container-inner'>
              {Object.keys(data).map((element, index) => (
                <div
                  key={index}
                  value={element}
                  onClick={(e) => {
                    handleClick(e);
                  }}
                  // activating the element if it is selected
                  className={`mx-1 ${
                    data[element] === 'active'
                      ? 'frequency-element-active mt-4'
                      : 'frequency-element mt-4'
                  }`}
                >
                  <div
                    className='frequency-text'
                    value={element}
                    onClick={(e) => {
                      handleClick(e);
                    }}
                  >
                    {element}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr />
          <div className='button-container'>
            <button
              className='btn btn-primary'
              onClick={() => previousStep(currentStep)}
            >
              Previous
            </button>
            {isActive && (
              <button
                className='btn btn-primary'
                onClick={() => increaseStep(data, currentStep)}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

Frequency.propTypes = {
  currentStep: PropTypes.number.isRequired,
  nextStep: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  setProperty: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentStep: state.space.currentStep,
});

export default connect(mapStateToProps, {
  nextStep,
  previousStep,
  setProperty,
})(Frequency);
