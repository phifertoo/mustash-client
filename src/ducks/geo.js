import axios from 'axios';

const initialState = {
  lat: 0,
  long: 0,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'GEOCODE_SUCCESS':
      return { ...state, lat: payload.lat, long: payload.lng };
    default:
      return state;
  }
}

export const geocode = ({ city, state }) => async (dispatch) => {
  const config = {
    params: {
      city,
      state,
    },
  };
  try {
    const res = await axios.get('/api/geocoding', config);
    dispatch({ type: 'GEOCODE_SUCCESS', payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.log(errors);
    }
    dispatch({ type: 'GEOCODE_FAIL' });
  }
};
