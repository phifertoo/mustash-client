import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { findSellerListings } from '../ducks/updateListings';

export const MyListings = ({
  seller_id,
  findSellerListings,
  sellerListings,
}) => {
  useEffect(() => {
    const input = {
      seller_id,
      token: localStorage.token,
    };
    findSellerListings(input);
  }, [seller_id, findSellerListings]);

  console.log(sellerListings);

  return (
    <Fragment>
      <div className='mylistings-container'>
        <div className='mylistings-inner-container'>
          {sellerListings &&
            sellerListings.map((element, index) => (
              <div className='card mylistings-card-container col-3' key={index}>
                <img
                  className='card-img-top mylistings-card-image'
                  src={element.s3Images.image1.url}
                  alt='Card image cap'
                />
                <div className='card-body'>
                  <h5 className='card-title'>{element.typeString}</h5>
                  <p className='card-text'>{element.addressString}</p>
                  <a href='#' className='btn btn-primary'>
                    Edit
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

MyListings.propTypes = {
  findSellerListings: PropTypes.func.isRequired,
  seller_id: PropTypes.string.isRequired,
  sellerListings: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  seller_id: state.auth.user,
  sellerListings: state.updateListings.sellerListings,
});

export default connect(mapStateToProps, { findSellerListings })(MyListings);
