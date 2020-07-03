import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setDashboardStep } from '../ducks/updateListings';
import { setMyRentals, setSelectedRental } from '../ducks/rentals';
import { dashboardMap } from './dashboardMap';

export const MyRentals = ({
  setMyRentals,
  myRentals,
  step,
  token,
  setDashboardStep,
  setSelectedRental,
}) => {
  useEffect(() => {
    setMyRentals(token); // this is causing an unnecessary call that is throwing an error because there is no seller_id before login.
  }, [setMyRentals, token]);

  const handleclick = (step, listing) => {
    setDashboardStep(step);
    setSelectedRental(listing);
  };

  return (
    <Fragment>
      {dashboardMap[step] === 'myrentals' ? (
        <div className='myRentals-container'>
          <div className='myRentals-inner-container'>
            {myRentals.length > 0 ? (
              myRentals.map((element, index) => (
                <div className='card myRentals-card-container' key={index}>
                  <img
                    className='card-img-top myRentals-card-image'
                    src={element.imageArray[0].url}
                    alt=''
                    onClick={() => handleclick(7, element)}
                  />

                  <div className='card-body'>
                    <h5 className='card-title'>{element.typeString}</h5>
                    <p className='card-text'>{element.addressString}</p>
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

MyRentals.propTypes = {
  setMyRentals: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  setDashboardStep: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  myRentals: state.rentals.myRentals,
  step: state.updateListings.step,
  token: state.auth.token,
});

export default connect(mapStateToProps, {
  setMyRentals,
  setDashboardStep,
  setSelectedRental,
})(MyRentals);
