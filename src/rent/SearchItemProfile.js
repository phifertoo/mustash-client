import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  findNearListings,
  selectResultIndex,
  selectResult,
} from '../ducks/searchListings';

const SearchItemProfile = ({
  findNearListings,
  nearbyListings,
  selectedResult,
  selectResult,
}) => {
  let searchItem = selectedResult;
  const nearbyListingsArray = nearbyListings.locations;

  useEffect(() => {
    if (searchItem) {
      findNearListings(searchItem.addressString, 5);
    }
  }, [findNearListings, searchItem]);

  const handleClick = (selectedResult) => {
    selectResult(selectedResult);
  };

  return (
    <Fragment>
      {searchItem && (
        <div className='search-item-profile-container'>
          <h4>{searchItem.addressString}</h4>
          <div className='search-item-profile-main-image-container '>
            {searchItem && (
              <img
                src={searchItem.s3Images.image1.url}
                className='search-item-profile-main-image'
                alt=''
              />
            )}
          </div>
          <div className='image-thumbnails-container'>
            {Object.keys(searchItem.s3Images).map((element, index) => (
              <a
                key={index}
                target='_blank'
                href={searchItem.s3Images[element].url}
                className='mr-3'
              >
                {index !== 0 && (
                  <img src={searchItem.s3Images[element].url} alt='Forest' />
                )}
              </a>
            ))}
          </div>

          <div className='container'>
            <h1 className='display-4 search-item-profile-type'>
              {searchItem.typeString}
            </h1>

            <div className='search-item-profile-button-container'>
              <button className='btn-lg btn-danger'>Reserve Now</button>
            </div>
            <div className='search-item-profile-details-container'>
              <p className='lead'>$/Mo: ${searchItem.price}</p>
              <p className='lead'>
                Size:{' '}
                {`${searchItem.size.length} ft (length) x ${searchItem.size.width} ft (width) x ${searchItem.size.height} ft (height)`}
              </p>
              <p className='lead'>Access: {searchItem.accessString}</p>
              <p className='lead'>Frequency: {searchItem.frequencyString}</p>
              <p className='lead'>
                Eligible Contents:{' '}
                {searchItem.content.join('').replace(/,/g, ', ')}
              </p>
              <p className='lead'>Description: {searchItem.description}</p>
            </div>
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
