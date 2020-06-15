import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { findNearListings, selectResult } from '../ducks/searchListings';

const SearchItemProfile = ({
  findNearListings,
  nearbyListings,
  selectedResult,
  selectResult,
}) => {
  const nearbyListingsArray = nearbyListings.locations;

  useEffect(() => {
    if (selectedResult) {
      findNearListings(selectedResult.addressString, 1);
    }
  }, [findNearListings, selectedResult]);

  const handleClick = (selectedResult) => {
    selectResult(selectedResult);
  };

  return (
    <Fragment>
      {selectedResult && (
        <div className='search-item-profile-container'>
          <div className='search-item-profile-main-image-container '>
            {selectedResult && (
              <img
                src={selectedResult.s3Images.image1.url}
                className='search-item-profile-main-image'
                alt=''
              />
            )}
          </div>
          <div className='image-thumbnails-container'>
            {Object.keys(selectedResult.s3Images).map((element, index) => (
              <a
                key={index}
                target='_blank'
                href={selectedResult.s3Images[element].url}
                className='mr-3'
              >
                {index !== 0 && (
                  <img
                    src={selectedResult.s3Images[element].url}
                    alt='No picture'
                  />
                )}
              </a>
            ))}
          </div>
          <div className='container '>
            <hr />
            <h4>{selectedResult.addressString}</h4>

            <div className='search-item-profile-button-container'>
              <button className='btn-lg btn-danger mb-3'>Reserve Now</button>
            </div>
            <hr />

            <div className='search-item-profile-details-container'>
              <p className='lead'>Type: ${selectedResult.typeString}</p>

              <p className='lead'>$/Mo: ${selectedResult.price}</p>
              <p className='lead'>
                Size:{' '}
                {`${selectedResult.size.length} ft (length) x ${selectedResult.size.width} ft (width) x ${selectedResult.size.height} ft (height)`}
              </p>
              <p className='lead'>Access: {selectedResult.accessString}</p>
              <p className='lead'>
                Frequency: {selectedResult.frequencyString}
              </p>
              <p className='lead'>
                Eligible Contents:{' '}
                {selectedResult.content.join('').replace(/,/g, ', ')}
              </p>
              <p className='lead'>Description: {selectedResult.description}</p>
            </div>
            <hr />
            <h1>Nearby Listings:</h1>
            <div className='nearby-listings-container'>
              {nearbyListingsArray &&
                nearbyListingsArray.map((element, index) => (
                  <div className='nearby-listing-card mr-3' key={index}>
                    <div className='nearby-listing-card-image-container '>
                      <img
                        className='card-img-top nearby-listing-card-image'
                        src={element.s3Images.image1.url}
                        alt='Card image cap'
                      />
                    </div>
                    <div className='card-body'>
                      <h5 className='card-title'>${element.price}/Mo.</h5>
                      <p className='card-text nearby-listing-card-address'>
                        {element.addressString}
                      </p>
                      <button
                        className='btn btn-primary'
                        onClick={() => handleClick(element)}
                      >
                        Go somewhere
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

SearchItemProfile.propTypes = {
  searchResults: PropTypes.array.isRequired,
  findNearListings: PropTypes.func.isRequired,
  nearbyListings: PropTypes.object.isRequired,
  selectedResult: PropTypes.object.isRequired,
  selectResult: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  index: state.searchListings.selectedResultIndex,
  searchResults: state.searchListings.searchResults,
  nearbyListings: state.searchListings.nearbyListings,
  selectedResult: state.searchListings.selectedResult,
});

export default connect(mapStateToProps, {
  findNearListings,
  selectResult,
})(SearchItemProfile);
