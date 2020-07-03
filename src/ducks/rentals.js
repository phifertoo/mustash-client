import axios from 'axios';

const initialState = {
  myRentals: [],
  selectedRental: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SETMYRENTALS_SUCCESS':
      return { ...state, myRentals: payload };
    case 'SETSELECTEDRENTAL_SUCCESS':
      return { ...state, selectedRental: payload };
    default:
      return state;
  }
}

export const setMyRentals = (token) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };
  try {
    const res = await axios.get('/api/renter', config);
    dispatch({ type: 'SETMYRENTALS_SUCCESS', payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.log(errors);
    }
    dispatch({ type: 'SETMYRENTALS_FAIL' });
  }
};

export const setSelectedRental = (selectedRental) => async (dispatch) => {
  try {
    dispatch({ type: 'SETSELECTEDRENTAL_SUCCESS', payload: selectedRental });
  } catch (err) {
    dispatch({ type: 'SETSELECTEDRENTAL_FAIL' });
  }
};
