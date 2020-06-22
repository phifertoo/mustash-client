import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dashboardMap } from './dashboardMap';

export const UpdateListing = ({ step, selectedListing }) => {
  const [data, setData] = useState({
    type: selectedListing.typeString,
    length: selectedListing.size.length,
    width: selectedListing.size.width,
    height: selectedListing.size.height,
    address: selectedListing.addressString,
    // content: selectedListing.content.join(','),
    smallVehicles: selectedListing.content.some(
      (element) => element === 'Small Vehicles'
    ),
    smallItems: selectedListing.content.some(
      (element) => element === 'Small Items'
    ),
    rv: selectedListing.content.some((element) => element === "RV's"),
    largeItems: selectedListing.content.some(
      (element) => element === 'Large Items'
    ),
    // frequency: selectedListing.frequencyString,
    // monthly: selectedListing.frequencyString === 'Monthly' ? true : false,
    // weekly: selectedListing.frequencyString === 'Weekly' ? true : false,
    // daily: selectedListing.frequencyString === 'Daily' ? true : false,
    // access: selectedListing.accessString,
    frequency: selectedListing.frequencyString.toLowerCase(),
    access: selectedListing.accessString.toLowerCase(),
    title: selectedListing.title,
    description: selectedListing.description,
    price: selectedListing.price,
  });

  const {
    title,
    length,
    width,
    height,
    address,
    smallVehicles,
    smallItems,
    rv,
    largeItems,
    frequency,
    access,
    // access: selectedListing.accessString,
    daytime,
    evening,
    twentyfour,
    description,
    price,
  } = data;

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheck = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.checked,
    });
  };

  const handleFrequency = (e) => {
    setData({
      ...data,
      frequency: e.target.value,
    });
  };

  const handleAccess = (e) => {
    setData({
      ...data,
      access: e.target.value,
    });
  };

  return (
    <Fragment>
      {dashboardMap[step] === 'updateListing' && (
        <div className='form-group '>
          Type:
          <input
            className='form-control'
            name='title'
            type='text'
            placeholder={selectedListing.title}
            value={title}
            onChange={(e) => handleChange(e)}
          />
          Length:
          <input
            className='form-control'
            name='length'
            type='text'
            placeholder={selectedListing.size.length}
            value={length}
            onChange={(e) => handleChange(e)}
          />
          <input
            className='form-control'
            name='width'
            type='text'
            placeholder={selectedListing.size.width}
            value={width}
            onChange={(e) => handleChange(e)}
          />
          <input
            className='form-control'
            name='height'
            type='text'
            placeholder={selectedListing.size.height}
            value={height}
            onChange={(e) => handleChange(e)}
          />
          <input
            className='form-control'
            name='address'
            type='text'
            placeholder={selectedListing.address}
            value={address}
            onChange={(e) => handleChange(e)}
          />
          <input
            className='form-control'
            name='description'
            type='text'
            placeholder={selectedListing.description}
            value={description}
            onChange={(e) => handleChange(e)}
          />
          <input
            className='form-control'
            name='price'
            type='text'
            placeholder={selectedListing.price}
            value={price}
            onChange={(e) => handleChange(e)}
          />
          Small Vehicles{' '}
          <input
            className='form-control'
            name='smallVehicles'
            type='checkbox'
            value='smallVehicles'
            checked={smallVehicles ? 'checked' : ''}
            onChange={(e) => handleCheck(e)}
          />
          Small Items
          <input
            className='form-control'
            name='smallItems'
            type='checkbox'
            value='Small Items'
            checked={smallItems ? 'checked' : ''}
            onChange={(e) => handleCheck(e)}
          />
          RV's
          <input
            className='form-control'
            name='rv'
            type='checkbox'
            value="RV's"
            checked={rv ? 'checked' : ''}
            onChange={(e) => handleCheck(e)}
          />{' '}
          Large Items
          <input
            className='form-control'
            name='largeItems'
            type='checkbox'
            value='Large Items'
            checked={largeItems ? 'checked' : ''}
            onChange={(e) => handleCheck(e)}
          />
          Monthly
          <input
            className='form-control'
            name='frequency'
            type='radio'
            value='monthly'
            checked={frequency === 'monthly' ? 'checked' : ''}
            onChange={(e) => handleFrequency(e)}
          />
          Weekly
          <input
            className='form-control'
            name='frequency'
            type='radio'
            value='weekly'
            checked={frequency === 'weekly' ? 'checked' : ''}
            onChange={(e) => handleFrequency(e)}
          />
          Daily
          <input
            className='form-control'
            name='frequency'
            type='radio'
            value='daily'
            checked={frequency === 'daily' ? 'checked' : ''}
            onChange={(e) => handleFrequency(e)}
          />
          Day Time
          <input
            className='form-control'
            name='access'
            type='radio'
            value='daytime'
            checked={access === 'daytime' ? 'checked' : ''}
            onChange={(e) => handleAccess(e)}
          />
          Evening
          <input
            className='form-control'
            name='access'
            type='radio'
            value='evening'
            checked={access === 'evening' ? 'checked' : ''}
            onChange={(e) => handleAccess(e)}
          />
          24/7
          <input
            className='form-control'
            name='access'
            type='radio'
            value='24/7'
            checked={access === '24/7' ? 'checked' : ''}
            onChange={(e) => handleAccess(e)}
          />
        </div>
      )}
    </Fragment>
  );
};

UpdateListing.propTypes = {
  step: PropTypes.number.isRequired,
  selectedListing: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.updateListings.step,
  selectedListing: state.updateListings.selectedListing,
});

export default connect(mapStateToProps, {})(UpdateListing);
