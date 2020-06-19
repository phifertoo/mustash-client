import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dashboardMap } from './dashboardMap';

export const UpdateListing = ({ step }) => {
  return (
    <Fragment>
      {dashboardMap[step] === 'updateListing' && (
        <div className='summary-component-container'>
          <table className='table table-bordered '>
            <thead>
              <tr>
                <th>Category</th>
                <th>Detail</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Type</td>
                <td></td>
                <td>
                  <button className='btn btn-sm btn-primary'>Edit</button>
                </td>
              </tr>
              <tr>
                <td>Size</td>
                <td>{``}</td>
                <td>
                  <button className='btn btn-sm btn-primary'>Edit</button>
                </td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{}</td>
                <td>
                  <button className='btn btn-sm btn-primary'>Edit</button>
                </td>
              </tr>
              <tr>
                <td>Content</td>
                <td>{}</td>
                <td>
                  <button className='btn btn-sm btn-primary'>Edit</button>
                </td>
              </tr>
              <tr>
                <td>Access Frequency</td>
                <td></td>
                <td>
                  <button className='btn btn-sm btn-primary'>Edit</button>
                </td>
              </tr>
              <tr>
                <td>Access Hours</td>
                <td>{}</td>
                <td>
                  <button className='btn btn-sm btn-primary'>Edit</button>
                </td>
              </tr>
              <tr>
                <td>Title</td>
                <td>{}</td>
                <td>
                  <button className='btn btn-sm btn-primary'>Edit</button>
                </td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{}</td>
                <td>
                  <button className='btn btn-sm btn-primary'>Edit</button>
                </td>
              </tr>
              <tr>
                <td>Price</td>
                <td>{``}</td>
                <td>
                  <button className='btn btn-sm btn-primary'>Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
        </div>
      )}
    </Fragment>
  );
};

UpdateListing.propTypes = {
  step: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({ step: state.updateListings.step });

export default connect(mapStateToProps, {})(UpdateListing);
