import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export const Landing = () => {
  return (
    <section className="landing">
      <div className="buttons">
        <Link
          to="/register"
          className="btn btn-primary animate__animated animate__swing"
        >
          Sign Up
        </Link>
        <Link to="/login" className="btn btn-light">
          Login
        </Link>
      </div>
    </section>
  );
};
Landing.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Landing);
