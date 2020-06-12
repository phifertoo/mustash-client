import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { nextStep, setProperty } from '../ducks/list';
import { stepMap } from './stepMap';

export const Type = ({ currentStep, nextStep, setProperty }) => {
  const [data, setData] = useState({
    bedroom: '',
    basement: '',
    garage: '',
    warehouse: '',
    lot: '',
    rv: '',
    attic: '',
  });

  const [nextButton, setButton] = useState({
    isActive: false,
  });

  const { isActive } = nextButton;

  const initialState = {
    bedroom: '',
    basement: '',
    garage: '',
    warehouse: '',
    lot: '',
    rv: '',
    attic: '',
  };

  const handleClick = (e) => {
    setData({
      ...initialState,
      [e.target.attributes.value.value]: 'active',
    });
    setButton({
      isActive: true,
    });
  };

  const increaseStep = (data, currentStep) => {
    nextStep(currentStep);
    const type = Object.keys(data).find(
      (element) => data[element] === 'active'
    );
    setProperty('type', type);
  };

  return (
    <Fragment>
      {stepMap[currentStep] === 'type' && (
        <div className='type-component-container'>
          <h4 className='type-title'>
            Which one of these best describes your space?
          </h4>
          <div className='type-container-outer mt-3'>
            <div className='type-container-inner'>
              {Object.keys(data).map((element, index) => (
                <div
                  key={index}
                  name='type'
                  value={element}
                  onClick={(e) => {
                    handleClick(e);
                  }}
                  // activating the element if it is selected
                  className={`mx-1 ${
                    data[element] === 'active'
                      ? 'type-element-active'
                      : 'type-element'
                  }`}
                >
                  <div
                    className='type-text'
                    name='type'
                    value={element}
                    onClick={(e) => {
                      handleClick(e);
                    }}
                  >
                    {element}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr />
          <div className='type-button-container'>
            {isActive && (
              <button
                className='btn btn-primary'
                onClick={() => increaseStep(data, currentStep)}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

Type.propTypes = {
  currentStep: PropTypes.number.isRequired,
  nextStep: PropTypes.func.isRequired,
  setProperty: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentStep: state.space.currentStep,
});

export default connect(mapStateToProps, { nextStep, setProperty })(Type);
