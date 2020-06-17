import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import Login from './auth/Login.js';
import Register from './auth/Register.js';
import Landing from './layout/Landing.js';
import ListSpace from './list/ListSpace';
import SearchResults from './rent/SearchResults';
import PrivateRoute from './routing/PrivateRoute';
import SellerDashboard from './list/SellerDashboard';
import { findSellerListings } from './ducks/updateListings';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/searchresults' component={SearchResults} />
            <PrivateRoute exact path='/getstarted' component={ListSpace} />
            <PrivateRoute
              exact
              path='/sellerdashboard'
              component={SellerDashboard}
            />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
