import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  findSellerListings,
  setDashboardStep,
  setSelectedListing,
} from '../ducks/updateListings';
import { dashboardMap } from './dashboardMap';

export const MyListings = ({
  seller_id,
  findSellerListings,
  sellerListings,
  step,
  setDashboardStep,
  setSelectedListing,
}) => {
  useEffect(() => {
    const input = {
      seller_id,
      token: localStorage.token,
    };
    findSellerListings(input); // this is causing an unnecessary call that is throwing an error because there is no seller_id before login.
  }, [seller_id, findSellerListings]);

  const handleClick = (step, selectedListing) => {
    setDashboardStep(step);
    setSelectedListing(selectedListing);
  };

  return (
    <Fragment>
      {dashboardMap[step] === 'mylistings' ? (
        <div className='mylistings-container'>
          <div className='mylistings-inner-container'>
            {sellerListings.length > 0 ? (
              sellerListings.map((element, index) => (
                <div
                  className='card mylistings-card-container col-3'
                  key={index}
                >
                  <img
                    className='card-img-top mylistings-card-image'
                    src={element.s3Images.image1.url}
                    alt='Card image cap'
                  />
                  <div className='card-body'>
                    <h5 className='card-title'>{element.typeString}</h5>
                    <p className='card-text'>{element.addressString}</p>
                    <a
                      onClick={() => handleClick(1, element)}
                      className='btn btn-primary'
                    >
                      Edit
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div>No current listings</div>
            )}
          </div>
        </div>
      ) : (
        ''
      )}
    </Fragment>
  );
};

MyListings.propTypes = {
  findSellerListings: PropTypes.func.isRequired,
  seller_id: PropTypes.string.isRequired,
  sellerListings: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  setDashboardStep: PropTypes.func.isRequired,
  setSelectedListing: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  seller_id: state.auth.user,
  sellerListings: state.updateListings.sellerListings,
  step: state.updateListings.step,
});

export default connect(mapStateToProps, {
  findSellerListings,
  setDashboardStep,
  setSelectedListing,
})(MyListings);
