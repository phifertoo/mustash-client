import React from "react";
import { connect } from "react-redux";
import Navbar from "../layout/Navbar";
import Address from "./Address";
import Type from "./Type";
import Size from "./Size";
import Content from "./Content";
import Frequency from "./Frequency";
import Access from "./Access";
import TitleDescription from "./TitleDescription";
import Price from "./Price";
import Images from "./Images";
import Summary from "./Summary";

export const ListSpace = () => {
  return (
    <div>
      <Navbar />
      <Address />
      <Type />
      <Size />
      <Content />
      <Frequency />
      <Access />
      <TitleDescription />
      <Price />
      <Images />
      <Summary />
    </div>
  );
};

ListSpace.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(ListSpace);
