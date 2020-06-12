import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SearchItemProfile = ({ index, searchResults }) => {
  const searchItem = searchResults[index];
  console.log(searchItem);

  return (
    <div className='jumbotron jumbotron-fluid search-item-profile-container'>
      <div className='search-item-profile-main-image-container '>
        {searchItem && (
          <img
            src={searchItem.s3Images.image1.url}
            className='search-item-profile-main-image'
            alt=''
          />
        )}
      </div>
      <div className='image-thumbnails-container mt-4 m'>
        {searchItem &&
          Object.keys(searchItem.s3Images).map((element, index) => (
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
        <h1 className='display-4'>Fluid jumbotron</h1>
        <p className='lead'>
          This is a modified jumbotron that occupies the entire horizontal space
          of its parent.
        </p>
      </div>
    </div>
  );
};

SearchItemProfile.propTypes = {
  index: PropTypes.number.isRequired,
  searchResults: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  index: state.searchListings.selectedResultIndex,
  searchResults: state.searchListings.searchResults,
});

export default connect(mapStateToProps)(SearchItemProfile);
