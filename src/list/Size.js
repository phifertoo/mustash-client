import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { nextStep, previousStep, setProperty } from '../ducks/list';
import { stepMap } from './stepMap';

export const Size = ({ currentStep, nextStep, previousStep, setProperty }) => {
  const [data, setData] = useState({
    length: '',
    width: '',
    height: '',
  });
  const { length, width, height } = data;

  const handleChange = (e) => {
    const pattern = /^([1-9][0-9]{0,1})$/;
    if (pattern.test(e.target.value) || e.target.value === '')
      setData({
        ...data,
        [e.target.name]: Number(e.target.value),
      });
  };

  const increaseStep = (data, currentStep) => {
    nextStep(currentStep);
    setProperty('dimensions', data);
  };

  const decreaseStep = (currentStep) => {
    previousStep(currentStep);
  };

  const completed = Object.keys(data).every((element) => data[element] !== '');

  return (
    <Fragment>
      {stepMap[currentStep] === 'size' && (
        <div className='size-component-container'>
          <h4 className='type-title mt-4'>
            Specify the dimensions of your space. Round to the nearest foot.
          </h4>
          <div className='size-container'>
            <div className='size-input-container'>
              <div className='size-inner-input-container'>
                <div>
                  <p>Length </p>
                </div>
                {/* allow decimals */}
                <input
                  className='form-control size-input mr-3'
                  name='length'
                  type='text'
                  placeholder='0'
                  value={length}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className='mr-3'>
                <p> X </p>
              </div>
              <div className='size-inner-input-container mr-3'>
                <div>
                  <p>Width</p>
                </div>
                {/* allow decimals */}
                <input
                  className='form-control size-input'
                  name='width'
                  type='text'
                  placeholder='0'
                  value={width}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div>
                <p> X </p>
              </div>
              <div className='size-inner-input-container'>
                <div>
                  <p>Height </p>
                </div>
                {/* allow decimals */}
                <input
                  className='form-control size-input'
                  name='height'
                  type='text'
                  placeholder='0'
                  value={height}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
            </div>
          </div>
          <hr />
          <div className='button-container'>
            <button
              className='btn btn-primary'
              onClick={() => decreaseStep(currentStep)}
            >
              Previous
            </button>
            {completed && (
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

Size.propTypes = {
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
})(Size);
