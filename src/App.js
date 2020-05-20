import React, { Fragment } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import Login from "./auth/Login.js";
import Register from "./auth/Register.js";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
