import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { nextStep, previousStep, setTitleDescription } from "../actions/list";
import { stepMap } from "./stepMap";

export const TitleDescription = ({
  currentStep,
  setTitleDescription,
  nextStep,
  previousStep,
}) => {
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const { title, description } = data;

  const increaseStep = (data, currentStep) => {
    setTitleDescription(data);
    nextStep(currentStep);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const completed = Object.keys(data).every((element) => data[element] !== "");

  return (
    <div>
      {stepMap[currentStep] === "titleDescription" && (
        <Fragment>
          <h4 className="titleDescription-title mt-4">
            Provide a title and description of your space
          </h4>
          <div className="titleDescription-container">
            <div className="form-group titleDescription-inner-container">
              <input
                className="form-control"
                name="title"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => handleChange(e)}
              />
              <textarea
                className="form-control description-box mt-4"
                name="description"
                type="text"
                placeholder="Description"
                value={description}
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
            {completed && (
              <button
                className="btn btn-primary"
                onClick={() => increaseStep(data, currentStep)}
              >
                Next
              </button>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

TitleDescription.propTypes = {
  currentStep: PropTypes.number.isRequired,
  nextStep: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  setTitleDescription: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentStep: state.space.currentStep,
});

export default connect(mapStateToProps, {
  nextStep,
  previousStep,
  setTitleDescription,
})(TitleDescription);
