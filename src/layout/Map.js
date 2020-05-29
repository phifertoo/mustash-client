import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export const Map = ({ lat, long }) => {
  console.log(lat, long);

  const GoogleMapExample = withGoogleMap(({ lat, long }) => {
    let array = [
      { lat: 40.756795, lng: -75 },
      { lat: 40.756795, lng: -75.02 },
    ];

    return (
      <GoogleMap defaultCenter={{ lat: 40.756795, lng: -75 }} defaultZoom={13}>
        {" "}
        {/* <Marker
          onClick={() => alert("bottom")}
          position={{ lat: 40.756795, lng: -52 }}
        /> */}
        {array.map((element, index) => (
          <Marker key={index} position={element} />
        ))}
      </GoogleMap>
    );
  });

  return (
    <div>
      <GoogleMapExample
        containerElement={
          <div
            style={{
              height: 350,
              width: "100vw",
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "center",
              padding: 0,
            }}
          />
        }
        mapElement={
          <div
            style={{
              width: "100%",
              marginLeft: 0,
            }}
          />
        }
      />
    </div>
  );
};

Map.propTypes = {
  lat: PropTypes.number.isRequired,
  long: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  lat: state.geo.lat,
  long: state.geo.long,
});

export default connect(mapStateToProps)(Map);
