import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert, register } from '../ducks/auth';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';

export const Register = ({ setAlert, register }) => {
  const [formData, setFormData] = useState({
    name: '',
    firstName: '',
    lastName: '',
    city: '',
    phone: '',
    email: '',
    password: '',
    password2: '',
  });
  const {
    name,
    firstName,
    lastName,
    city,
    phone,
    email,
    password,
    password2,
  } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      /* The setAlert method is defined in actions/alert.js. The setAlert method
        takes in a msg and a alertType argument. The msg and alertType are set to
        the payload then dispatched to the store/state */
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ formData });
    }
  };

  return (
    <div>
      <Navbar />
      <section>
        <div className='sign-up '>
          <h1 className='text-primary'>Sign Up</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Create Your Account
          </p>
          <form className='register-form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group mb-1'>
              <input
                className='form-control'
                type='text'
                placeholder='First Name'
                value={firstName}
                onChange={(e) => onChange(e)}
                name='firstName'
              />
            </div>
            <div className='form-group mb-1'>
              <input
                className='form-control'
                type='text'
                placeholder='Last Name'
                value={lastName}
                onChange={(e) => onChange(e)}
                name='lastName'
              />
            </div>
            <div className='form-group mb-1'>
              <input
                className='form-control'
                type='text'
                placeholder='City'
                value={city}
                onChange={(e) => onChange(e)}
                name='city'
              />
            </div>
            <div className='form-group mb-1'>
              <input
                className='form-control'
                type='text'
                placeholder='Phone Number'
                value={phone}
                onChange={(e) => onChange(e)}
                name='phone'
              />
            </div>
            <div className='form-group  mb-1'>
              <input
                className='form-control'
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group mb-1'>
              <input
                className='form-control'
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group  mb-3'>
              <input
                className='form-control'
                type='password'
                placeholder='Confirm Password'
                name='password2'
                value={password2}
                onChange={(e) => onChange(e)}
              />
            </div>
            <input type='submit' className='btn btn-primary' value='Register' />
          </form>
          <p className='my-3'>
            Already have an account? <Link to='/login'>Sign In</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { setAlert, register })(Register);
