import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getImages, selectResult } from '../ducks/searchListings';

const SearchItem = ({ searchItem, getImages, index, selectResult }) => {
  const handleClick = (searchItem) => {
    selectResult(searchItem);
  };
  // const [data, setData] = useState({
  //   encodedImage: '',
  // });

  // useEffect(() => {
  //   const asyncToBase64 = async (id) => {
  //     // retrieve images from mongoDB
  //     const images = await getImages(id);
  //     const image = images.image1.data.data;
  //     // btoa converts the string into a base64 encoded string
  //     return await btoa(
  //       // convert the buffer into a string
  //       await image.reduce((data, byte) => data + String.fromCharCode(byte), "")
  //     );
  //   };
  //   asyncToBase64(searchItem._id).then(
  //     (success) => {
  //       //once the promise is received, set it in the local state.
  //       // this is necessary because the component needs to rerender to reflect the
  //       // change when the promise is completed.
  //       setData({ encodedImage: success });
  //     },
  //     (fail) => {
  //       console.log(fail);
  //     }
  //   );
  // }, [data.encodedImage, searchItem._id, getImages]);
  return (
    <div className='card mb-3'>
      <div className='row no-gutters'>
        <div className='col-md-2'>
          {searchItem.s3Images && (
            <img
              // src={`data:image/png;base64,${data.encodedImage}`}
              src={searchItem.s3Images.image1.url}
              className='card-img-left'
              alt='not working'
            ></img>
          )}
        </div>
        <div className='col-md-8 search-item-card-right-container'>
          <div className='card-body'>
            <h5 className='card-title'>
              {searchItem.title} : ${searchItem.price} per month
            </h5>
            <p className='card-text'>Address: {searchItem.addressString}</p>

            <p className='card-text'>
              Size:{' '}
              {`${searchItem.size.length} ft (length) x ${searchItem.size.width} ft (width) x ${searchItem.size.height} ft (height)`}
            </p>
            <p className='card-text'>
              Access: {searchItem.accessString} Frequency:{' '}
              {searchItem.frequencyString}
            </p>
            <p className='card-text'>
              Eligible Contents:{' '}
              {searchItem.content.join('').replace(/,/g, ', ')}
            </p>
          </div>
          <div className='search-item-card-button-container'>
            <button
              className='btn-lg btn-danger'
              onClick={() => {
                handleClick(searchItem);
              }}
            >
              Full Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

SearchItem.propTypes = {
  searchItem: PropTypes.object.isRequired,
  getImages: PropTypes.func.isRequired,
  selectResult: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  getImages,
  selectResult,
})(SearchItem);
