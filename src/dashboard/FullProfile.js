import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { findNearListings, selectResult } from '../ducks/searchListings';
import { dashboardMap } from './dashboardMap';
import { setSelectedRental, addComment } from '../ducks/rentals';

const SearchItemProfile = ({
  findNearListings,
  nearbyListings,
  selectedRental,
  addComment,
  step,
  token,
}) => {
  useEffect(() => {
    if (selectedRental) {
      findNearListings(selectedRental.addressString, 1);
    }
  }, [findNearListings, selectedRental]);

  const [comment, setComment] = useState('');

  const handleClick = (selectedRental) => {
    setSelectedRental(selectedRental);
  };

  const commentInput = {
    comment,
    token,
    listing_id: selectedRental._id,
  };

  const handleCommentSubmit = (commentInput) => {
    setComment('');
    addComment(commentInput);
  };

  return (
    <Fragment>
      {dashboardMap[step] === 'fullProfile' && (
        <div className='myrentals-profile-container'>
          <div className='myrentals-comment-container my-5'>
            <div className='myrentals-comment-inner-container'>
              <div class='post-form'>
                <div class='bg-primary'>
                  <h3 className='myrentals-comment-title'>
                    How was your experience?
                  </h3>
                </div>
                <form
                  class='form my-1'
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCommentSubmit(commentInput);
                  }}
                >
                  <textarea
                    name='text'
                    cols='30'
                    rows='5'
                    className='myrentals-textarea'
                    placeholder='Leave a comment'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  ></textarea>
                  <input
                    type='submit'
                    class='btn btn-dark my-1'
                    value='Submit'
                  />
                </form>
              </div>
            </div>
          </div>
          <div className='search-item-profile-main-image-container '>
            {selectedRental && (
              <img
                src={selectedRental.imageArray[0].url}
                className='search-item-profile-main-image'
                alt=''
              />
            )}
          </div>
          <div className='image-thumbnails-container'>
            {selectedRental.imageArray.map((element, index) => (
              <a
                key={index}
                target='_blank'
                rel='noopener noreferrer'
                href={selectedRental.imageArray[index].url}
                className='mr-3'
              >
                {index !== 0 && (
                  <img src={selectedRental.imageArray[index].url} alt='' />
                )}
              </a>
            ))}
          </div>
          <div className='container '>
            <hr />
            <h4>{selectedRental.addressString}</h4>
            <hr />

            <div className='search-item-profile-details-container'>
              <p className='lead'>Type: {selectedRental.typeString}</p>

              <p className='lead'>$/Mo: ${selectedRental.price}</p>
              <p className='lead'>
                Size:{' '}
                {`${selectedRental.size.length} ft (length) x ${selectedRental.size.width} ft (width) x ${selectedRental.size.height} ft (height)`}
              </p>
              <p className='lead'>Access: {selectedRental.accessString}</p>
              <p className='lead'>
                Frequency: {selectedRental.frequencyString}
              </p>
              <p className='lead'>
                Eligible Contents:{' '}
                {selectedRental.content.join('').replace(/,/g, ', ')}
              </p>
              <p className='lead'>Description: {selectedRental.description}</p>
            </div>
            <hr />
            <h1>Nearby Listings:</h1>
            <div className='nearby-listings-container'>
              {nearbyListings?.map((element, index) => (
                <div className='nearby-listing-card mr-3' key={index}>
                  <div className='nearby-listing-card-image-container '>
                    <img
                      className='card-img-top nearby-listing-card-image'
                      src={element.imageArray[0].url}
                      alt=''
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
  nearbyListings: PropTypes.array.isRequired,
  selectedRental: PropTypes.object.isRequired,
  selectResult: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  addComment: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  index: state.updateListings.selectedRentalIndex,
  nearbyListings: state.searchListings.nearbyListings.locations,
  selectedRental: state.rentals.selectedRental,
  token: state.auth.token,
  step: state.updateListings.step,
});

export default connect(mapStateToProps, {
  findNearListings,
  selectResult,
  addComment,
})(SearchItemProfile);
