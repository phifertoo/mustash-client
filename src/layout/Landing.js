import React, { useState, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Navbar from './Navbar';
import piggy from '../assets/piggy-bank.jpg';
import clutter from '../assets/clutter.jpg';
import PropTypes from 'prop-types';
/* 1.npm install aos 2. import AOS from 'aos' 3. import 'aos/dist/aos.css' 4. AOS.init() in useEffect*/
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  searchListings,
  saveSearchQuery,
  clearSelectedResult,
} from '../ducks/searchListings';

export const Landing = ({ saveSearchQuery, clearSelectedResult }) => {
  const [data, setData] = useState({
    address: '',
    radius: 0,
    redirect: false,
  });
  const { address, radius, redirect } = data;
  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    saveSearchQuery(data);
    // searchListings();
    // geocode({ city, state });
    setData({
      ...data,
      redirect: true,
    });
  };

  useEffect(() => {
    AOS.init();
    clearSelectedResult();

    // if (redirect) {
    //   return <Redirect to="/searchlistings" />;
    // }
  }, []);
  return (
    <Fragment>
      <Navbar />
      {redirect ? <Redirect to='/searchresults' /> : null}
      <div className='test'>
        <div className='background-image'>
          <form
            className='search-form-container'
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <input
              className='search-form mr-3'
              type='text'
              placeholder='Enter an address'
              value={address}
              name='address'
              onChange={(e) => handleChange(e)}
            />
            <select
              className='mr-3 select-state'
              value={radius}
              name='radius'
              onChange={(e) => handleChange(e)}
            >
              <option>Radius</option>
              <option>1</option>
              <option>2</option>
              <option>5</option>
              <option>10</option>
              <option>25</option>
            </select>
            <button
              type='submit'
              className='btn btn-danger search-button'
              value='Search'
            >
              Search
            </button>
          </form>
        </div>
        {/* You can center all the elements inside the parent using text-center */}
        <section className='row text-center '>
          <div className='col-lg-6 mt-3' data-aos='fade-right'>
            <h4 className='display-4 font-weight-bold'>Need space?</h4>
            <h1 className=''>How renting works</h1>
            <p className='p-1'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
              labore. Assumenda eaque dolore maxime saepe velit. Delectus et
              nemo hic quisquam velit nostrum, vel ipsam minima minus,
              dignissimos, quibusdam architecto?
            </p>
            <button className='btn btn-danger mb-3'>Learn More</button>
          </div>
          <img
            src={clutter}
            className='col-lg-6 p-0 img-fluid my-0'
            data-aos='fade-left'
            alt=''
          />
        </section>
        <section className='row text-center '>
          <div className='col-lg-6 order-lg-2' data-aos='fade-left'>
            <h4 className='display-4 font-weight-bold mt-3'>Have space?</h4>
            <h1 className=''>How leasing works</h1>
            <p className='p-1'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
              labore. Assumenda eaque dolore maxime saepe velit. Delectus et
              nemo hic quisquam velit nostrum, vel ipsam minima minus,
              dignissimos, quibusdam architecto?
            </p>
            <Link to='/getStarted'>
              <button className='btn btn-danger mb-3'>Learn More</button>
            </Link>
          </div>
          <img
            src={piggy}
            className='col-lg-6 order-lg-1 p-0 img-fluid'
            data-aos='fade-right'
            alt=''
          />
        </section>
      </div>
    </Fragment>
  );
};
Landing.propTypes = {
  searchListings: PropTypes.func.isRequired,
  saveSearchQuery: PropTypes.func.isRequired,
  clearSelectedResult: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  searchListings,
  saveSearchQuery,
  clearSelectedResult,
})(Landing);
