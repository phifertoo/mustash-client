import axios from 'axios';

const initialState = {
  sellerListings: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'FINDSELLERLISTINGS_SUCCESS':
      return { ...state, sellerListings: payload };
    default:
      return state;
  }
}

export const findSellerListings = (input) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': input.token,
    },
  };
  try {
    const res = await axios.get(`/api/listing/${input.seller_id}`, config);
    dispatch({ type: 'FINDSELLERLISTINGS_SUCCESS', payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
