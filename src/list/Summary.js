import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { previousStep, setStep, submitSpace } from '../ducks/list';
import { stepMap } from './stepMap';

export const Summary = ({
  currentStep,
  previousStep,
  setStep,
  address,
  type,
  size,
  content,
  frequency,
  access,
  price,
  description,
  title,
  images,
  submitSpace,
}) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClick = () => {
    const data = {
      addressString,
      typeString,
      size,
      content,
      frequencyString,
      accessString,
      price,
      description,
      title,
      images,
      token: localStorage.token,
    };
    submitSpace(data).then((result) => {
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
      }
    });
  };

  const handleEdit = (step) => {
    setStep(step);
  };

  const typeString =
    type === 'rv' ? 'RV' : `${type.charAt(0).toUpperCase()}${type.slice(1)}`;
  const accessString = `${access.charAt(0).toUpperCase()}${access.slice(1)}`;
  const frequencyString =
    frequency === '24/7'
      ? '24/7'
      : `${frequency.charAt(0).toUpperCase()}${frequency.slice(1)}`;
  const addressString = `${address.street}, ${address.city}, ${address.state}, ${address.zip}`;

  const showSuccess = () => {
    if (success) {
      return <h3 className='text-success'>Your space has been listed</h3>;
    } else if (error) {
      return <h3 className='text-danger'>Error in listing your space</h3>;
    }
  };

  useEffect(() => {});

  return (
    <Fragment>
      {stepMap[currentStep] === 'summary' && (
        <div className='summary-component-container'>
          {showSuccess()}
          <table className='table table-bordered '>
            <thead>
              <tr>
                <th>Category</th>
                <th>Detail</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Type</td>
                <td>{typeString}</td>
                <td>
                  <button
                    className='btn btn-sm btn-primary'
                    onClick={() => handleEdit(0)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
              <tr>
                <td>Size</td>
                <td>{`${size.length} ft (length) x ${size.width} ft (width) x ${size.height} ft (height)`}</td>
                <td>
                  <button
                    className='btn btn-sm btn-primary'
                    onClick={() => handleEdit(1)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{addressString}</td>
                <td>
                  <button
                    className='btn btn-sm btn-primary'
                    onClick={() => handleEdit(2)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
              <tr>
                <td>Content</td>
                <td>{content.join(', ')}</td>
                <td>
                  <button
                    className='btn btn-sm btn-primary'
                    onClick={() => handleEdit(3)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
              <tr>
                <td>Access Frequency</td>
                <td>{frequencyString}</td>
                <td>
                  <button
                    className='btn btn-sm btn-primary'
                    onClick={() => handleEdit(4)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
              <tr>
                <td>Access Hours</td>
                <td>{accessString}</td>
                <td>
                  <button
                    className='btn btn-sm btn-primary'
                    onClick={() => handleEdit(5)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
              <tr>
                <td>Title</td>
                <td>{title}</td>
                <td>
                  <button
                    className='btn btn-sm btn-primary'
                    onClick={() => handleEdit(6)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{description}</td>
                <td>
                  <button
                    className='btn btn-sm btn-primary'
                    onClick={() => handleEdit(6)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
              <tr>
                <td>Price</td>
                <td>{`$ ${price}`}</td>
                <td>
                  <button
                    className='btn btn-sm btn-primary'
                    onClick={() => handleEdit(7)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <div className='button-container'>
            <button
              className='btn btn-primary'
              onClick={() => previousStep(currentStep)}
            >
              Previous
            </button>
            <button className='btn btn-primary' onClick={() => handleClick()}>
              List it!
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

Summary.propTypes = {
  currentStep: PropTypes.number.isRequired,
  previousStep: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  submitSpace: PropTypes.func.isRequired,
  address: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.object.isRequired,
  content: PropTypes.array.isRequired,
  frequency: PropTypes.string.isRequired,
  access: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  images: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currentStep: state.space.currentStep,
  address: state.space.address,
  type: state.space.type,
  size: state.space.size,
  content: state.space.content,
  frequency: state.space.frequency,
  access: state.space.access,
  price: state.space.price,
  description: state.space.description,
  images: state.space.images,
  title: state.space.title,
});

export default connect(mapStateToProps, {
  previousStep,
  setStep,
  submitSpace,
})(Summary);
