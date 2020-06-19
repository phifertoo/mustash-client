import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';
import MyListings from './MyListings';
import UpdateListing from './UpdateListing';

export const Dashboard = ({ seller_id, findSellerListings }) => {
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
          <MyListings />
          <UpdateListing />
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Dashboard);
