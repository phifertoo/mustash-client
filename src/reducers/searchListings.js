const initialState = {
  searchResults: [],
  searchAddress: "1710 Tyler Drive, Monterey Park, CA 91755",
  searchRadius: 5,
  center: { lat: 0, lng: 0 },
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "SAVESEARCHQUERY_SUCCESS":
      return {
        ...state,
        searchAddress: payload.address,
        searchRadius: Number(payload.radius),
      };
    case "SEARCHLISTINGS_SUCCESS":
      return {
        ...state,
        searchResults: payload.locations,
        center: payload.center,
      };
    default:
      return state;
  }
}
