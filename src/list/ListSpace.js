import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';
import Address from './Address';
import Type from './Type';
import Size from './Size';
import Content from './Content';
import Frequency from './Frequency';
import Access from './Access';
import TitleDescription from './TitleDescription';
import Price from './Price';
import Images from './Images';
import Summary from './Summary';
import Progress from './Progress';

export const ListSpace = () => {
  return (
    <div>
      <Navbar />
      <div className='list-container'>
        <Progress />
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
    </div>
  );
};

ListSpace.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(ListSpace);
