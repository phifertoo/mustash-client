import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "../layout/Navbar";
import { login } from "../actions/auth";
import PropTypes from "prop-types";

export const Landing = ({ login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div>
      <Navbar />
      <section>
        <div className="sign-up ">
          <h1 className="text-primary">Sign In</h1>
          <form className="register-form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group  mb-1">
              <input
                className="form-control"
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group mb-1">
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>
            <input type="submit" className="btn btn-primary" value="Log In" />
          </form>
          <p className="my-3">
            Don't have an account? <Link to="/Register">Register</Link>
          </p>
        </div>
      </section>
    </div>
  );
};
Landing.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { login })(Landing);
