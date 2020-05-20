import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import playerInfoReducer from "./playerInfo/playerInfoSlice";

export default configureStore({
  reducer: {
    playerInfo: playerInfoReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
