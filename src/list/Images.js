import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { nextStep, previousStep, setImages } from '../actions/list';
import { stepMap } from './stepMap';

export const Images = ({ currentStep, setImages, nextStep, previousStep }) => {
  const [data, setData] = useState({
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: '',
  });

  const increaseStep = (data, currentStep) => {
    setImages(data);
    nextStep(currentStep);
  };

  const handleChange = async (e) => {
    if (e.target.files[0].size <= 3000000) {
      //create an image url so you don't have to store the image in the state/redux
      const imageURL = window.URL.createObjectURL(e.target.files[0]);
      // let testblob = await fetch(imageURL).then((r) => r.blob());
      // console.log(testblob);
      setData({
        ...data,
        [e.target.name]: imageURL,
      });
    } else {
      //if the pictures are greater than 1MB, the input value needs to be set to an empty string.
      e.target.value = '';
      alert('Pictures must be less than 3MB');
    }
  };

  return (
    <Fragment>
      {stepMap[currentStep] === 'image' && (
        <div className='image-component-container'>
          <h4 className='image-title mt-4'>
            Upload up to 5 pictures of your space. Pictures must be less than
            1MB.
          </h4>
          <div className='image-container'>
            <div className='form-group image-inner-container'>
              <input
                className='form-control input-image'
                name='image1'
                type='file'
                accept='image/*'
                onChange={(e) => handleChange(e)}
              />
              <input
                className='form-control input-image mt-2'
                name='image2'
                type='file'
                accept='image/*'
                onChange={(e) => handleChange(e)}
              />
              <input
                className='form-control input-image mt-2'
                name='image3'
                type='file'
                accept='image/*'
                onChange={(e) => handleChange(e)}
              />
              <input
                className='form-control input-image mt-2'
                name='image4'
                type='file'
                accept='image/*'
                onChange={(e) => handleChange(e)}
              />
              <input
                className='form-control input-image mt-2'
                name='image5'
                type='file'
                accept='image/*'
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <hr />
          <div className='button-container'>
            <button
              className='btn btn-primary'
              onClick={() => previousStep(currentStep)}
            >
              Previous
            </button>
            <button
              className='btn btn-primary'
              onClick={() => increaseStep(data, currentStep)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </Fragment>
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
