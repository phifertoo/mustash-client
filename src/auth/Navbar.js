import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../assets/mustashlogo.png";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <img className="logo " src={logo} alt="" />
      <ul className="nav-list text-center">
        <li className="nav-item active">
          <a className="nav-link" href="#">
            Sign In
          </a>
        </li>
        <li className="nav-item active">
          <a className="nav-link" href="#">
            Sign Up
          </a>
        </li>
        <li className="nav-item active">
          <a className="nav-link" href="#">
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
