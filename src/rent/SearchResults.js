import React, { useEffect } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';
import SearchItem from './SearchItem';
import { searchListings } from '../ducks/searchListings';

export const SearchResults = ({
  searchAddress,
  searchRadius,
  searchResults,
  searchListings,
  center,
}) => {
  useEffect(() => {
    searchListings(searchAddress, searchRadius);
  }, [searchListings, searchRadius, searchAddress]);

  const searchArray = searchResults.reduce((acc, nextVal) => {
    acc.push({
      lat: nextVal.location.coordinates[1],
      lng: nextVal.location.coordinates[0],
    });
    return acc;
  }, []);
  const GoogleMapExample = withGoogleMap(() => {
    return (
      <GoogleMap defaultCenter={center} defaultZoom={13}>
        {/* <Marker
          onClick={() => alert("bottom")}
          position={{ lat: 40.756795, lng: -52 }}
        /> */}
        {searchArray.map((element, index) => (
          <Marker key={index} position={element} />
        ))}
      </GoogleMap>
    );
  });

  return (
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
      <h1 className='large text-primary'>Search Results</h1>
      {searchResults.length > 0 ? (
        searchResults.map((element, index) => (
          <SearchItem key={index} searchItem={element} />
        ))
      ) : (
        <h4>No results found...</h4>
      )}
    </div>
  );
};

SearchResults.propTypes = {
  searchResults: PropTypes.array.isRequired,
  searchListings: PropTypes.func.isRequired,
  searchAddress: PropTypes.string.isRequired,
  searchRadius: PropTypes.number.isRequired,
  center: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  searchResults: state.searchListings.searchResults,
  searchAddress: state.searchListings.searchAddress,
  searchRadius: state.searchListings.searchRadius,
  center: state.searchListings.center,
});

export default connect(mapStateToProps, { searchListings })(SearchResults);
