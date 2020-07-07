import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { findNearListings, selectResult } from '../ducks/searchListings';
import { dashboardMap } from './dashboardMap';
import { setSelectedRental, addComment, addRating } from '../ducks/rentals';
import { resetSelectedListing } from '../ducks/updateListings';
import Comment from './Comment';

const SearchItemProfile = ({
  findNearListings,
  nearbyListings,
  selectedRental,
  addComment,
  step,
  token,
  addRating,
  user,
}) => {
  useEffect(() => {
    if (selectedRental) {
      findNearListings(selectedRental.addressString, 1);
    }
  }, [findNearListings, selectedRental]);

  const [data, setData] = useState({
    comment: '',
    rating: 0,
    editComments: false,
    editRating: false,
  });

  const { comment, rating, editComments, editRating } = data;

  const handleClick = (selectedRental) => {
    setSelectedRental(selectedRental);
  };

  const commentInput = {
    comment,
    token,
    listing_id: selectedRental._id,
  };

  const rateInput = {
    rating,
    token,
    listing_id: selectedRental._id,
  };

  const handleCommentSubmit = (e, commentInput) => {
    e.preventDefault();
    addComment(commentInput);
    setData({
      ...data,
      comment: '',
    });
  };

  const handleRateSubmit = (e, rateInput) => {
    e.preventDefault();

    addRating(rateInput);
    setData({
      ...data,
      rating: 0,
    });
  };

  const handleChange = (e) => {
    setData({
      ...data,
      comment: e.target.value,
    });
  };

  const handleRate = (selectedRating) => {
    setData({
      ...data,
      rating: selectedRating,
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.value]: true,
    });
  };

  const ratingArray = [1, 2, 3, 4, 5];

  const commentsAndRatings = () => {
    return (
      <div>
        <div className='bg-primary'>
          <h3 className='myrentals-comment-title'>How was your experience?</h3>
        </div>
        <form className='form mt-4'>
          {!selectedRental.comments.find(
            (element) => element.renter === user
          ) || editComments ? (
            <div>
              <textarea
                name='text'
                cols='30'
                rows='5'
                className='myrentals-textarea'
                placeholder='Leave a comment'
                value={comment}
                onChange={(e) => handleChange(e)}
                required
              ></textarea>

              <button
                className='btn btn-dark mt-3'
                onClick={(e) => {
                  handleCommentSubmit(e, commentInput);
                }}
              >
                Submit
              </button>
            </div>
          ) : (
            <div>
              <p className='submitted-comments-a lead'>
                Your submitted comments:{' '}
              </p>
              <p className='submitted-comments-b'>
                {
                  selectedRental.comments.find(
                    (element) => element.renter === user
                  ).comment
                }
              </p>
              <br />

              <button
                className='btn btn-dark mt-3'
                value='editComments'
                onClick={(e) => {
                  handleEdit(e);
                }}
              >
                Edit
              </button>
            </div>
          )}
          <div className='mt-4'>
            <div className='bg-primary'>
              <h3 className='myrentals-comment-title'>Rate your experience</h3>
            </div>
          </div>
          {!selectedRental.ratings.find((element) => element.renter === user) ||
          editRating ? (
            <div>
              <div className='rating-star-container mt-4'>
                {ratingArray.map((element, index) => (
                  <span
                    className={
                      data.rating >= element
                        ? 'fa fa-star rating-star star-checked'
                        : 'fa fa-star rating-star'
                    }
                    key={index}
                    onClick={() => handleRate(element)}
                  ></span>
                ))}
              </div>
              <button
                className='btn btn-dark mt-4'
                onClick={(e) => {
                  handleRateSubmit(e, rateInput);
                }}
              >
                Submit
              </button>
            </div>
          ) : (
            <div className='mt-4'>
              <p className='lead'>
                Your rating:{' '}
                {
                  selectedRental.ratings.find(
                    (element) => element.renter === user
                  ).rating
                }{' '}
                Stars
              </p>
              <button
                className='btn btn-dark mt-3'
                value='editRating'
                onClick={(e) => {
                  handleEdit(e);
                }}
              >
                Edit
              </button>
            </div>
          )}
        </form>
        <hr />
      </div>
    );
  };

  return (
    <Fragment>
      {dashboardMap[step] === 'fullProfile' && (
        <div className='myrentals-profile-container'>
          <div className='myrentals-comment-container my-5'>
            <div className='myrentals-comment-inner-container'>
              {commentsAndRatings()}
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
            <h4>Comments</h4>
            {selectedRental.comments.map((element, index) => (
              <Comment key={index} comment={element} />
            ))}
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
  addRating: PropTypes.func.isRequired,
  resetSelectedListing: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  index: state.updateListings.selectedRentalIndex,
  nearbyListings: state.searchListings.nearbyListings.locations,
  selectedRental: state.rentals.selectedRental,
  token: state.auth.token,
  step: state.updateListings.step,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  findNearListings,
  selectResult,
  addComment,
  addRating,
  resetSelectedListing,
})(SearchItemProfile);
