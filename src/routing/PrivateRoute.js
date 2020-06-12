import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({
  /* In App.js, <PrivateRoute> passes in props = {component: Dashboard}
  which we set to component: Component below. Now, <Component>
  will be set to <DashBoard>
  ...rest accounts for any other props that are passed in from App.js
isAuthenticated and loading are pulled from the state*/
  component: Component,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    /* To render a component with props using <Route>, you need to use the 
    render prop which takes in a function. The function has a props parameter
    which can pass in all the props into the Component by using {...props}*/
    render={(props) =>
      !isAuthenticated ? <Redirect to='/login' /> : <Component {...props} />
    }
  />
);

PrivateRoute.propTypes = { isAuthenticated: PropTypes.bool.isRequired };

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
