import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { nextStep, previousStep, setContent, setType } from '../actions/list';
import { stepMap } from './stepMap';
import large_items from '../assets/large_items.png';
import large_vehicles from '../assets/large_vehicle.png';
import small_items from '../assets/small_items.png';
import small_vehicles from '../assets/small_vehicle.png';

export const Content = ({
  currentStep,
  nextStep,
  previousStep,
  setContent,
}) => {
  const [data, setData] = useState({
    cars: {
      name: 'Small Vehicles',
      active: false,
      picture: small_vehicles,
    },
    smallItems: {
      name: 'Small Items',
      active: false,
      picture: small_items,
    },
    rv: {
      name: "RV's",
      active: false,
      picture: large_vehicles,
    },
    largeItems: {
      name: 'Large Items',
      active: false,
      picture: large_items,
    },
  });

  const [nextButton, setButton] = useState({
    isActive: false,
  });

  const { isActive } = nextButton;

  useEffect(() => {
    if (Object.keys(data).every((element) => data[element].active === false)) {
      setButton({
        isActive: false,
      });
    }
  }, [data]);

  const handleClick = (e) => {
    if (data[e.target.attributes.value.value].active) {
      setData({
        ...data,
        [e.target.attributes.value.value]: {
          name: data[e.target.attributes.value.value].name,
          active: false,
          picture: data[e.target.attributes.value.value].picture,
        },
      });
    } else {
      setData({
        ...data,
        [e.target.attributes.value.value]: {
          name: data[e.target.attributes.value.value].name,
          active: true,
          picture: data[e.target.attributes.value.value].picture,
        },
      });
      setButton({
        isActive: true,
      });
    }
  };

  const increaseStep = (data, currentStep) => {
    const selectedContent = Object.keys(data).reduce((acc, nextVal) => {
      if (data[nextVal].active) {
        acc.push(data[nextVal].name);
      }
      return acc;
    }, []);
    setContent(selectedContent);
    nextStep(currentStep);
  };

  return (
    <Fragment>
      {stepMap[currentStep] === 'content' && (
        <div className='content-component-container'>
          <h4 className='content-title'>
            Which items may be stored in your space (you may select more than
            one)?
          </h4>
          <div className='content-container-outer mt-3'>
            <div className='content-container-inner '>
              {Object.keys(data).map((element, index) => (
                <div className='content-inner-grid-container' key={index}>
                  <div
                    className={` ${
                      data[element].active
                        ? 'content-card-active'
                        : 'content-card'
                    }`}
                    name='content'
                    value={element}
                  >
                    <div
                      className='content-element-title'
                      name='content'
                      value={element}
                    >
                      <h1 name='content' value={element}>
                        {data[element].name}
                      </h1>
                    </div>
                    <div
                      name='content'
                      value={element}
                      onClick={(e) => {
                        handleClick(e);
                      }}
                      // activating the element if it is selected
                      className='content-element'
                    >
                      <img
                        src={data[element].picture}
                        name='content'
                        value={element}
                        onClick={(e) => {
                          handleClick(e);
                        }}
                        alt=''
                      />
                    </div>
                  </div>
                </div>
              ))}
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

Content.propTypes = {
  currentStep: PropTypes.number.isRequired,
  nextStep: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  setContent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentStep: state.space.currentStep,
});

export default connect(mapStateToProps, {
  nextStep,
  setType,
  setContent,
  previousStep,
})(Content);
