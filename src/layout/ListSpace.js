import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "./Navbar";

export const ListSpace = ({}) => {
  const [formData, setFormData] = useState({
    address: {
      street: "",
      city: "",
      state: "",
      zip: 0,
    },
    type: "",
    price: 0,
    description: "",
    picture: "",
    title: "",
  });
  const { address, type, price, description, picture, title } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Navbar />
      <section>
        <div className="sign-up ">
          <h1 className="text-primary">List Your Space</h1>
          <form className="register-form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group mb-1">
              <input
                className="form-control"
                type="text"
                placeholder="street"
                value={address.street}
                onChange={(e) => onChange(e)}
                name="address.street"
              />
            </div>
            <div className="form-group mb-1">
              <input
                className="form-control"
                type="text"
                placeholder="city"
                value={address.city}
                onChange={(e) => onChange(e)}
                name="address.city"
              />
            </div>{" "}
            <select
              className="mr-3 select-state"
              value={address.state}
              name="address.state"
              onChange={(e) => onChange(e)}
            >
              <option></option>
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
            <div className="form-group mb-1">
              <input
                className="form-control"
                type="text"
                placeholder="zip"
                value={address.zip}
                onChange={(e) => onChange(e)}
                name="address.zip"
              />
            </div>
            <div className="form-group  mb-1">
              <select
                className="mr-3 select-state"
                value={type}
                name="type"
                onChange={(e) => onChange(e)}
              >
                <option></option>
                <option>Bedroom</option>
                <option>Basement</option>
                <option>Garage</option>
                <option>Warehouse</option>
                <option>Storage Facility</option>
                <option>Lot</option>
                <option>RV Pad</option>
              </select>
            </div>
            <div className="form-group mb-1">
              <input
                className="form-control"
                type="text"
                placeholder="Price"
                name="price"
                value={price}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group  mb-3">
              <input
                className="form-control"
                type="text"
                placeholder="Description"
                name="description"
                value={description}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group  mb-3">
              <input
                className="form-control"
                type="text"
                placeholder="Picture"
                name="picture"
                value={picture}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group  mb-3">
              <input
                className="form-control"
                type="text"
                placeholder="title"
                name="title"
                value={title}
                onChange={(e) => onChange(e)}
              />
            </div>
            <input type="submit" className="btn btn-primary" value="List It!" />
          </form>
        </div>
      </section>
    </div>
  );
};

ListSpace.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(ListSpace);
