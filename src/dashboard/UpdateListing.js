import React, { Fragment, useState } from 'react';
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
    frequency: selectedListing.frequencyString.toLowerCase(),
    access: selectedListing.accessString.toLowerCase(),
    title: selectedListing.title,
    description: selectedListing.description,
    price: selectedListing.price,
  });

  const {
    title,
    type,
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

  const handleSelect = (e) => {
    setData({
      ...data,
      type: e.target.value,
    });
  };

  return (
    <Fragment>
      {dashboardMap[step] === 'updateListing' && (
        <div className='form-group updateListings-container'>
          <div className='updateListings-inner-container'>
            <div className='updateListings-inner-left-container'>
              <h4>Type:</h4>
              <h4>L x W x H:</h4>
              <h4>Address:</h4>
              <h4>Price:</h4>
              <h4>Content:</h4>
              <h4>Frequency:</h4>
              <h4>Hours:</h4>
              <h4>Description:</h4>
            </div>
            <div className='updateListings-inner-right-container'>
              <div className='updateListings-property-container'>
                <select
                  className='custom-select-sm updateListings-select'
                  onChange={(e) => handleSelect(e)}
                >
                  <option>{data.type}</option>
                  <option value='bedroom'>Bedroom</option>
                  <option value='basement'>Basement</option>
                  <option value='garage'>Garage</option>
                  <option value='warehouse'>Warehouse</option>
                  <option value='lot'>Lot</option>
                  <option value='rv'>RV</option>
                  <option value='attic'>Attic</option>
                </select>
              </div>
              <div className='updateListings-dimensions-container'>
                <div className='updateListings-dimensions-outer-container'>
                  <div className='updateListings-dimensions-inner-container'>
                    <input
                      className='form-control updateListings-dimensions'
                      name='length'
                      type='text'
                      placeholder={selectedListing.size.length}
                      value={length}
                      onChange={(e) => handleChange(e)}
                    />
                    <h4>ft</h4>
                  </div>
                  <div className='updateListings-dimensions-inner-container'>
                    <input
                      className='form-control updateListings-dimensions'
                      name='width'
                      type='text'
                      placeholder={selectedListing.size.width}
                      value={width}
                      onChange={(e) => handleChange(e)}
                    />
                    <h4>ft</h4>
                  </div>
                  <div className='updateListings-dimensions-inner-container'>
                    <input
                      className='form-control updateListings-dimensions'
                      name='height'
                      type='text'
                      placeholder={selectedListing.size.height}
                      value={height}
                      onChange={(e) => handleChange(e)}
                    />
                    <h4>ft</h4>
                  </div>
                </div>
              </div>
              <div className='updateListings-property-container'>
                <input
                  className='form-control'
                  name='address'
                  type='text'
                  placeholder={selectedListing.address}
                  value={address}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className='updateListings-property-container'>
                <input
                  className='form-control'
                  name='price'
                  type='text'
                  placeholder={selectedListing.price}
                  value={price}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className='updateListings-property-container'>
                <div className='updateListings-content'>
                  <input
                    className='custom-checkbox updateListings-checkbox'
                    name='smallVehicles'
                    type='checkbox'
                    value='smallVehicles'
                    checked={smallVehicles ? 'checked' : ''}
                    onChange={(e) => handleCheck(e)}
                  />
                  <h4>Small Vehicles</h4>
                </div>
                <div className='updateListings-content'>
                  <input
                    className='custom-checkbox updateListings-checkbox'
                    name='smallItems'
                    type='checkbox'
                    value='Small Items'
                    checked={smallItems ? 'checked' : ''}
                    onChange={(e) => handleCheck(e)}
                  />
                  <h4>Small Items</h4>
                </div>
                <div className='updateListings-content'>
                  <input
                    className='custom-checkbox updateListings-checkbox'
                    name='rv'
                    type='checkbox'
                    value="RV's"
                    checked={rv ? 'checked' : ''}
                    onChange={(e) => handleCheck(e)}
                  />
                  <h4>RV's</h4>
                </div>
                <div className='updateListings-content'>
                  <input
                    className='custom-checkbox updateListings-checkbox'
                    name='largeItems'
                    type='checkbox'
                    value='Large Items'
                    checked={largeItems ? 'checked' : ''}
                    onChange={(e) => handleCheck(e)}
                  />
                  <h4>Large Items</h4>
                </div>
              </div>
              <div className='updateListings-property-container'>
                <div className='updateListings-frequency'>
                  <input
                    className='custom-radio updateListings-radio'
                    name='frequency'
                    type='radio'
                    value='monthly'
                    checked={frequency === 'monthly' ? 'checked' : ''}
                    onChange={(e) => handleFrequency(e)}
                  />
                  <h4>Monthly</h4>
                </div>
                <div className='updateListings-frequency'>
                  <input
                    className='custom-radio updateListings-radio'
                    name='frequency'
                    type='radio'
                    value='weekly'
                    checked={frequency === 'weekly' ? 'checked' : ''}
                    onChange={(e) => handleFrequency(e)}
                  />
                  <h4>Weekly</h4>
                </div>
                <div className='updateListings-frequency'>
                  <input
                    className='custom-radio updateListings-radio'
                    name='frequency'
                    type='radio'
                    value='daily'
                    checked={frequency === 'daily' ? 'checked' : ''}
                    onChange={(e) => handleFrequency(e)}
                  />
                  <h4>Daily</h4>
                </div>
              </div>
              <div className='updateListings-property-container'>
                <div className='updateListings-hours'>
                  <input
                    className='custom-radio updateListings-radio'
                    name='access'
                    type='radio'
                    value='daytime'
                    checked={access === 'daytime' ? 'checked' : ''}
                    onChange={(e) => handleAccess(e)}
                  />
                  <h4>Day Time</h4>
                </div>
                <div className='updateListings-hours'>
                  <input
                    className='custom-radio updateListings-radio'
                    name='access'
                    type='radio'
                    value='evening'
                    checked={access === 'evening' ? 'checked' : ''}
                    onChange={(e) => handleAccess(e)}
                  />
                  <h4>Evening</h4>
                </div>
                <div className='updateListings-hours'>
                  <input
                    className='custom-radio updateListings-radio'
                    name='access'
                    type='radio'
                    value='24/7'
                    checked={access === '24/7' ? 'checked' : ''}
                    onChange={(e) => handleAccess(e)}
                  />
                  <h4>24/7</h4>
                </div>
              </div>
              <div className='updateListings-property-container'>
                <textarea
                  className='form-control updateListings-textarea'
                  name='description'
                  placeholder={selectedListing.description}
                  value={description}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <button className='btn btn-primary updateListing-button'>
                Update
              </button>
            </div>
          </div>
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
