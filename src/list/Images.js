import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { nextStep, previousStep, setImages } from "../actions/list";
import { stepMap } from "./stepMap";

export const Images = ({ currentStep, setImages, nextStep, previousStep }) => {
  const [data, setData] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
  });

  const increaseStep = (data, currentStep) => {
    setImages(data);
    nextStep(currentStep);
  };

  const handleChange = async (e) => {
    //create an image url so you don't have to store the image in the state/redux
    const imageURL = window.URL.createObjectURL(e.target.files[0]);
    // let testblob = await fetch(imageURL).then((r) => r.blob());
    // console.log(testblob);

    setData({
      ...data,
      [e.target.name]: imageURL,
    });
  };

  return (
    <div>
      {stepMap[currentStep] === "image" && (
        <Fragment>
          <h4 className="image-title mt-4">Upload pictures of your space</h4>
          <div className="image-container">
            <div className="form-group image-inner-container">
              <input
                className="form-control input-image"
                name="image1"
                type="file"
                accept="image/*"
                placeholder="Upload picture"
                onChange={(e) => handleChange(e)}
              />
              <input
                className="form-control input-image mt-2"
                name="image2"
                type="file"
                accept="image/*"
                placeholder="Upload picture"
                onChange={(e) => handleChange(e)}
              />
              <input
                className="form-control input-image mt-2"
                name="image3"
                type="file"
                accept="image/*"
                placeholder="Upload picture"
                onChange={(e) => handleChange(e)}
              />
              <input
                className="form-control input-image mt-2"
                name="image4"
                type="file"
                accept="image/*"
                placeholder="Upload picture"
                onChange={(e) => handleChange(e)}
              />
              <input
                className="form-control input-image mt-2"
                name="image5"
                type="file"
                accept="image/*"
                placeholder="Upload picture"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <hr />
          <div className="button-container">
            <button
              className="btn btn-primary"
              onClick={() => previousStep(currentStep)}
            >
              Previous
            </button>
            <button
              className="btn btn-primary"
              onClick={() => increaseStep(data, currentStep)}
            >
              Next
            </button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

Images.propTypes = {
  currentStep: PropTypes.number.isRequired,
  nextStep: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  setImages: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentStep: state.space.currentStep,
});

export default connect(mapStateToProps, {
  nextStep,
  previousStep,
  setImages,
})(Images);
