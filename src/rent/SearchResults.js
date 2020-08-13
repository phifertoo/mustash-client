import React, { useEffect, Fragment } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';
import SearchItem from './SearchItem';
import { searchListings } from '../ducks/searchListings';
import SearchItemProfile from './SearchItemProfile';

export const SearchResults = ({
  searchAddress,
  searchRadius,
  searchResults,
  searchListings,
  center,
  selectedResult,
}) => {
  useEffect(() => {
    searchListings(searchAddress, searchRadius);
  }, [searchListings, searchRadius, searchAddress]);

  const GoogleMapExample = withGoogleMap(() => {
    return (
      <GoogleMap defaultCenter={center} defaultZoom={13}>
        {/* <Marker
          onClick={() => alert("bottom")}
          position={{ lat: 40.756795, lng: -52 }}
        /> */}
        {searchResults.map(
          (element, index) =>
            element.renter === '' && (
              <Marker
                key={index}
                position={{
                  lat: element.location.coordinates[1],
                  lng: element.location.coordinates[0],
                }}
              />
            )
        )}
      </GoogleMap>
    );
  });

  const showSearchResults = () => {
    if (
      searchResults.length > 0 &&
      //looking for search results with no renter
      !searchResults.every((element) => element.renter)
    ) {
      console.log('fail');
      // console.log(searchResults.every((element) => element.renter));

      return searchResults.map((element, index) => (
        <div key={index}>
          {element.renter === '' && (
            <SearchItem key={index} index={index} searchItem={element} />
          )}
        </div>
      ));
    } else {
      console.log('pass');

      return <h4>No results found...</h4>;
    }
  };

  return (
    <Fragment>
      <div>
        <Navbar />
        <GoogleMapExample
          containerElement={
            <div
              style={{
                height: 350,
                width: '100%',
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'center',
                padding: 0,
              }}
            />
          }
          mapElement={
            <div
              style={{
                width: '100%',
                marginLeft: 0,
              }}
            />
          }
        />
        {Object.keys(selectedResult).length === 0 ? (
          <h1 className='large text-primary'>Search Results</h1>
        ) : (
          ''
        )}
        {Object.keys(selectedResult).length === 0 ? (
          showSearchResults()
        ) : (
          <div>
            <SearchItemProfile />
          </div>
        )}
      </div>
    </Fragment>
  );
};

SearchResults.propTypes = {
  searchResults: PropTypes.array.isRequired,
  searchListings: PropTypes.func.isRequired,
  searchAddress: PropTypes.string.isRequired,
  searchRadius: PropTypes.number.isRequired,
  center: PropTypes.object.isRequired,
  selectedResult: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  searchResults: state.searchListings.searchResults,
  searchAddress: state.searchListings.searchAddress,
  searchRadius: state.searchListings.searchRadius,
  center: state.searchListings.center,
  selectedResult: state.searchListings.selectedResult,
});

export default connect(mapStateToProps, { searchListings })(SearchResults);
