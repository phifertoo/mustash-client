import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getImages } from "../actions/searchListings";

const SearchItem = ({ searchItem, getImages }) => {
  const [data, setData] = useState({
    encodedImage: "",
  });

  // useEffect(() => {
  //   const asyncToBase64 = async (id) => {
  //     // retrieve images from mongoDB
  //     const images = await getImages(id);
  //     const image = images.image1.data.data;
  //     // btoa converts the string into a base64 encoded string
  //     return await btoa(
  //       // convert the buffer into a string
  //       await image.reduce((data, byte) => data + String.fromCharCode(byte), "")
  //     );
  //   };
  //   asyncToBase64(searchItem._id).then(
  //     (success) => {
  //       //once the promise is received, set it in the local state.
  //       // this is necessary because the component needs to rerender to reflect the
  //       // change when the promise is completed.
  //       setData({ encodedImage: success });
  //     },
  //     (fail) => {
  //       console.log(fail);
  //     }
  //   );
  // }, [data.encodedImage, searchItem._id, getImages]);

  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-3">
          <img
            // src={`data:image/png;base64,${data.encodedImage}`}
            src={searchItem.s3Images.image1.url}
            className="card-img-left"
            alt="not working"
          ></img>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              {searchItem.title} : ${searchItem.price} per month
            </h5>
            <p className="card-text">Description: {searchItem.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

SearchItem.propTypes = {
  searchItem: PropTypes.object.isRequired,
  getImages: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { getImages })(SearchItem);
