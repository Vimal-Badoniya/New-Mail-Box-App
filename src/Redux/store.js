import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./LoginSlice";
import EmailReducer from './EmailSlice'

const store = configureStore({
  reducer: {
    login: LoginReducer,
    email : EmailReducer ,
  },
});

export default store;
