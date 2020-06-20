import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';
import MyListings from './MyListings';
import UpdateListing from './UpdateListing';
import PropTypes from 'prop-types';

export const Dashboard = ({ selectedListing, isAuthenticated }) => {
  const categories = ['My Listings', 'My Rentals', 'Inbox', 'Profile'];

  return (
    <Fragment>
      <div>
        <Navbar />
        <div className='dashboard-container'>
          <div className='dashboard-sidebar'>
            {categories.map((element, index) => (
              <div key={index} className='dashboard-categories'>
                {element}
              </div>
            ))}
          </div>
          {isAuthenticated && <MyListings />}
          {Object.keys(selectedListing).length > 0 && <UpdateListing />}
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  selectedListing: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  selectedListing: state.updateListings.selectedListing,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Dashboard);
