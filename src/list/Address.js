import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { nextStep, previousStep, setAddress } from '../ducks/list';
import { stepMap } from './stepMap';

export const Address = ({
  currentStep,
  setAddress,
  nextStep,
  previousStep,
}) => {
  const [data, setData] = useState({
    street: '',
    city: '',
    zip: '',
    state: '',
  });
  const { street, city, zip } = data;

  const increaseStep = (data, currentStep) => {
    setAddress(data);
    nextStep(currentStep);
  };

  const handleChange = (e) => {
    const pattern = /^([0-9]{0,5})$/;
    if (e.target.name !== 'zip' || pattern.test(e.target.value)) {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  const completed = Object.keys(data).every((element) => {
    if (element === 'zip') {
      return data.zip.length === 5;
    } else {
      return data[element] !== '';
    }
  });

  return (
    <Fragment>
      {stepMap[currentStep] === 'address' && (
        <div className='address-component-container'>
          <h4 className='address-title mt-4'>
            Provide the address for your space
          </h4>
          <div className='address-container'>
            <div className='form-group address-inner-container'>
              <input
                className='form-control address-input mt-3'
                name='street'
                type='text'
                placeholder='Street'
                value={street}
                onChange={(e) => handleChange(e)}
              />
              <div className='city-state-container mt-3'>
                <input
                  className='form-control address-input'
                  id='address-city'
                  name='city'
                  type='text'
                  placeholder='City'
                  value={city}
                  onChange={(e) => handleChange(e)}
                />
                <select
                  className='address-state'
                  name='state'
                  onChange={(e) => handleChange(e)}
                >
                  <option></option>
                  <option>AL</option>
                  <option>AK</option>
                  <option>AZ</option>
                  <option>AR</option>
                  <option>CA</option>
                  <option>CO</option>
                  <option>CT</option>
                  <option>FL</option>
                  <option>GA</option>
                  <option>HI</option>
                  <option>ID</option>
                  <option>IL</option>
                  <option>IN</option>
                  <option>IA</option>
                  <option>KS</option>
                  <option>KY</option>
                  <option>LA</option>
                  <option>ME</option>
                  <option>MD</option>
                  <option>MA</option>
                  <option>MI</option>
                  <option>MN</option>
                  <option>MS</option>
                  <option>MO</option>
                  <option>MT</option>
                  <option>NE</option>
                  <option>NV</option>
                  <option>NH</option>
                  <option>NM</option>
                  <option>NY</option>
                  <option>NC</option>
                  <option>ND</option>
                  <option>OH</option>
                  <option>OK</option>
                  <option>OR</option>
                  <option>PA</option>
                  <option>RI</option>
                  <option>SC</option>
                  <option>SD</option>
                  <option>TN</option>
                  <option>TX</option>
                  <option>UT</option>
                  <option>VT</option>
                  <option>VA</option>
                  <option>WA</option>
                  <option>WV</option>
                  <option>WI</option>
                  <option>WY</option>
                </select>
              </div>
              <input
                className='form-control address-input mt-3'
                name='zip'
                type='text'
                placeholder='Zip'
                value={zip}
                onChange={(e) => handleChange(e)}
              />
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

Address.propTypes = {
  currentStep: PropTypes.number.isRequired,
  nextStep: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentStep: state.space.currentStep,
});

export default connect(mapStateToProps, { nextStep, previousStep, setAddress })(
  Address
);
