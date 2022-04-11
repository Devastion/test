import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movie/movieSlice";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";

const store = configureStore({
  reducer: {
    movie: movieReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
