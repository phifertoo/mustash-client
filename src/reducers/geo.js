const initialState = {
  lat: 0,
  long: 0,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GEOCODE_SUCCESS":
      return { ...state, lat: payload.lat, long: payload.lng };
    default:
      return state;
  }
}
