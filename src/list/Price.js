import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { nextStep, previousStep, setPrice } from '../actions/list';
import { stepMap } from './stepMap';

export const Price = ({ currentStep, setPrice, nextStep, previousStep }) => {
  const [data, setData] = useState({
    price: '',
  });
  const { price } = data;

  const increaseStep = (data, currentStep) => {
    setPrice(price);
    nextStep(currentStep);
  };

  const handleChange = (e) => {
    const pattern = /^[1-9][0-9]{0,3}$/;
    if (pattern.test(e.target.value) || e.target.value === '') {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  const completed = Object.keys(data).every((element) => data[element] !== '');

  return (
    <Fragment>
      {stepMap[currentStep] === 'price' && (
        <div className='price-component-container'>
          <div className='price-container'>
            <div className='price-title-container'>
              <h4 className='price-title mt-4'>Name your price</h4>
            </div>
            <div className='form-group price-inner-container'>
              <label className='price-input-container'>
                <input
                  className='price-input'
                  name='price'
                  type='number'
                  value={price}
                  onChange={(e) => handleChange(e)}
                />
              </label>
            </div>
            <p className='suggestion-text'>We recommend $2 psf</p>
          </div>
          <hr />
          <div className='button-container'>
            <button
              className='btn btn-primary'
              onClick={() => previousStep(currentStep)}
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

Price.propTypes = {
  currentStep: PropTypes.number.isRequired,
  nextStep: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  setPrice: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentStep: state.space.currentStep,
});

export default connect(mapStateToProps, {
  nextStep,
  previousStep,
  setPrice,
})(Price);
