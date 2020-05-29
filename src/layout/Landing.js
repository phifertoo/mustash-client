import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import piggy from "../assets/piggy-bank.jpg";
import clutter from "../assets/clutter.jpg";
import { geocode } from "../actions/geo";
import PropTypes from "prop-types";
import Map from "./Map";
/* 1.npm install aos 2. import AOS from 'aos' 3. import 'aos/dist/aos.css' 4. AOS.init() in useEffect*/
import AOS from "aos";
import "aos/dist/aos.css";

export const Landing = ({ geocode }) => {
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    redirect: false,
  });
  const { city, state, redirect } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    geocode({ city, state });
    setFormData({ ...formData, redirect: true });
  };

  useEffect(() => {
    AOS.init();
    if (redirect) {
      return <Redirect to="/map" />;
    }
  }, [redirect]);
  return (
    <Fragment>
      <Navbar />
      <div className="test">
        <div className="background-image">
          <form
            className="search-form-container"
            onSubmit={(e) => {
              onSubmit(e);
            }}
          >
            <input
              className="search-form mr-3"
              type="text"
              placeholder="Enter a City"
              value={city}
              name="city"
              onChange={(e) => onChange(e)}
            />
            <select
              className="mr-3 select-state"
              value={state}
              name="state"
              onChange={(e) => onChange(e)}
            >
              <option>AL</option>
              <option>AK</option>
              <option>AZ</option>
              <option>AR</option>
              <option>CA</option>
              <option>CO</option>
              <option>CT</option>
              <option>FL</option>
              <option>GA</option>
              <option>HI</option>
              <option>ID</option>
              <option>IL</option>
              <option>IN</option>
              <option>IA</option>
              <option>KS</option>
              <option>KY</option>
              <option>LA</option>
              <option>ME</option>
              <option>MD</option>
              <option>MA</option>
              <option>MI</option>
              <option>MN</option>
              <option>MS</option>
              <option>MO</option>
              <option>MT</option>
              <option>NE</option>
              <option>NV</option>
              <option>NH</option>
              <option>NM</option>
              <option>NY</option>
              <option>NC</option>
              <option>ND</option>
              <option>OH</option>
              <option>OK</option>
              <option>OR</option>
              <option>PA</option>
              <option>RI</option>
              <option>SC</option>
              <option>SD</option>
              <option>TN</option>
              <option>TX</option>
              <option>UT</option>
              <option>VT</option>
              <option>VA</option>
              <option>WA</option>
              <option>WV</option>
              <option>WI</option>
              <option>WY</option>
            </select>
            <input
              type="submit"
              className="btn btn-danger search-button"
              value="Search"
            />
          </form>
        </div>
        {/* You can center all the elements inside the parent using text-center */}
        <section className="row text-center ">
          <div className="col-lg-6 mt-3" data-aos="fade-right">
            <h4 className="display-4 font-weight-bold">Need space?</h4>
            <h1 className="">How renting works</h1>
            <p className="p-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
              labore. Assumenda eaque dolore maxime saepe velit. Delectus et
              nemo hic quisquam velit nostrum, vel ipsam minima minus,
              dignissimos, quibusdam architecto?
            </p>
            <button className="btn btn-danger mb-3">Learn More</button>
          </div>
          <img
            src={clutter}
            className="col-lg-6 p-0 img-fluid my-0"
            data-aos="fade-left"
            alt=""
          />
        </section>
        <section className="row text-center ">
          <div className="col-lg-6 order-lg-2" data-aos="fade-left">
            <h4 className="display-4 font-weight-bold mt-3">Have space?</h4>
            <h1 className="">How leasing works</h1>
            <p className="p-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
              labore. Assumenda eaque dolore maxime saepe velit. Delectus et
              nemo hic quisquam velit nostrum, vel ipsam minima minus,
              dignissimos, quibusdam architecto?
            </p>
            <button className="btn btn-danger mb-3">Learn More</button>
          </div>
          <img
            src={piggy}
            className="col-lg-6 order-lg-1 p-0 img-fluid"
            data-aos="fade-right"
            alt=""
          />
        </section>
      </div>
      <Map />
    </Fragment>
  );
};
Landing.propTypes = {
  geocode: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { geocode })(Landing);
