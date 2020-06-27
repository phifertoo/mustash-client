import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dashboardMap } from './dashboardMap';
import { deleteImage } from '../ducks/updateListings';

export const UpdateImage = ({ step, selectedListing, token, deleteImage }) => {
  useEffect(() => {
    setData({
      ...data,
      imageArray: selectedListing.imageArray,
    });
  }, [step]);

  const [data, setData] = useState({
    imageArray: selectedListing.imageArray,
    newImageArray: [],
  });

  const { imageArray, newImageArray } = data;

  const input = {
    token,
    _id: selectedListing._id,
  };

  const handleChange = (e) => {
    if (e.target.files[0].size <= 3000000) {
      const imageURL = window.URL.createObjectURL(e.target.files[0]);
      newImageArray.push(imageURL);
      setData({
        ...data,
        newImageArray,
      });
    } else {
      /*if the pictures are greater than 1MB, the input value needs to be set to an empty string so that it doesn't
      look like the picture was uploaded */
      e.target.value = '';
      alert('Pictures must be less than 3MB');
    }
  };

  const onDelete = (data, index) => {
    imageArray.splice(index, 1);
    setData({
      ...data,
      imageArray,
    });
    deleteImage(data, index);
  };

  return (
    <Fragment>
      {dashboardMap[step] === 'updateImages' && (
        <div className='updateImages-parent-container'>
          <div className='updateImages-top-container'>
            <h1>You may upload {5 - imageArray.length} more images</h1>
            {Array(5 - imageArray.length)
              .fill(0)
              .map((element, index) => (
                <input
                  key={index}
                  className='form-control updateImage-input-image'
                  name='image'
                  type='file'
                  accept='image/*'
                  onChange={(e) => handleChange(e)}
                />
              ))}
            <button className='btn btn-primary'>Upload</button>
          </div>

          <hr />
          <div className='updateImages-bottom-container'>
            <div className='updateImages-bottom-inner-container'>
              {imageArray.map((element, index) => (
                <div
                  className='card updateImages-image-container mb-5'
                  key={index}
                >
                  <img src={imageArray[index].url} className='figure-img' />

                  <div className='card-body'>
                    <button
                      onClick={() => {
                        input.image = imageArray[index];
                        onDelete(input, index);
                      }}
                      className='btn btn-danger mr-3'
                    >
                      Delete
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

UpdateImage.propTypes = {
  step: PropTypes.number.isRequired,
  selectedListing: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  deleteImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.updateListings.step,
  selectedListing: state.updateListings.selectedListing,
  token: state.auth.token,
});

export default connect(mapStateToProps, { deleteImage })(UpdateImage);
