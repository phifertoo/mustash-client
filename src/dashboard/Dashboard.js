import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';
import MyListings from './MyListings';
import UpdateListing from './UpdateListing';
import PropTypes from 'prop-types';
import UpdateImages from './UpdateImages';
import { setDashboardStep } from '../ducks/updateListings';

export const Dashboard = ({
  selectedListing,
  isAuthenticated,
  setDashboardStep,
}) => {
  const categories = ['My Listings', 'My Rentals', 'Inbox', 'Profile'];

  const handleClick = (step) => {
    setDashboardStep(step);
    setDashboardStep(step);
  };

  return (
    <Fragment>
      <div>
        <Navbar />
        <div className='dashboard-container'>
          <div className='dashboard-sidebar'>
            {categories.map((element, index) => (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className='dashboard-categories'
              >
                {element}
              </div>
            ))}
          </div>
          {isAuthenticated && <MyListings />}
          {Object.keys(selectedListing).length > 0 && <UpdateListing />}
          {Object.keys(selectedListing).length > 0 && <UpdateImages />}
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  selectedListing: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  setDashboardStep: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedListing: state.updateListings.selectedListing,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setDashboardStep })(Dashboard);
