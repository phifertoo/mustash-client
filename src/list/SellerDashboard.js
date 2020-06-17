import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { findSellerListings } from '../ducks/updateListings';

export const SellerDashboard = ({ seller_id, findSellerListings }) => {
  useEffect(() => {
    const input = {
      seller_id,
      token: localStorage.token,
    };
    findSellerListings(input);
  }, [seller_id, findSellerListings]);

  return (
    <Fragment>
      <div>SellerDashboard</div>
    </Fragment>
  );
};

SellerDashboard.propTypes = {
  findSellerListings: PropTypes.func.isRequired,
  seller_id: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  seller_id: state.auth.user,
});

export default connect(mapStateToProps, { findSellerListings })(
  SellerDashboard
);
