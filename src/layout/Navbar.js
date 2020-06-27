import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../assets/mustashlogo.png';
import { logout } from '../ducks/auth';
import PropTypes from 'prop-types';
import { setDashboardStep } from '../ducks/updateListings';

export const Navbar = ({ isAuthenticated, logout, setDashboardStep }) => {
  const handleClick = () => {
    logout();
  };

  return (
    <nav className='navbar'>
      <Link to='/' className='logo-container'>
        <img className='logo ' src={logo} alt='' />
      </Link>
      <ul className='nav-list text-center'>
        {!isAuthenticated ? (
          <li className='nav-item active'>
            {' '}
            <Link to='/login' className='nav-link mt-2'>
              Log In
            </Link>
          </li>
        ) : (
          <li className='nav-item active'>
            <a
              className='nav-link mt-2'
              href='#!'
              onClick={() => {
                handleClick();
              }}
            >
              Log Out
            </a>
          </li>
        )}

        <li className='nav-item active'>
          {!isAuthenticated && (
            <Link to='/register' className='nav-link mt-2'>
              Sign Up
            </Link>
          )}
        </li>
        <li className='nav-item active'>
          {isAuthenticated && (
            <Link
              to='/dashboard'
              onClick={() => setDashboardStep(0)}
              className='nav-link mt-2'
            >
              Dashboard
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};
Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  setDashboardStep: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout, setDashboardStep })(Navbar);
