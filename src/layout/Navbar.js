import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../assets/mustashlogo.png";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo-container">
        <img className="logo " src={logo} alt="" />
      </Link>
      <ul className="nav-list text-center">
        <li className="nav-item active">
          <Link to="/login" className="nav-link mt-2">
            Login
          </Link>
        </li>
        <li className="nav-item active">
          <Link to="/register" className="nav-link mt-2">
            Sign Up
          </Link>
        </li>
        <li className="nav-item active">
          <a className="nav-link mt-2" href="#">
            About
          </a>
        </li>
      </ul>
    </nav>
  );
};
Navbar.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Navbar);
