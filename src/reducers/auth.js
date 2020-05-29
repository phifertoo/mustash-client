const initialState = {
  token: "",
  isAuthenticated: false,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      localStorage.setItem("token", payload.token);
      return { ...state, isAuthenticated: true };
    default:
      return state;
  }
}
