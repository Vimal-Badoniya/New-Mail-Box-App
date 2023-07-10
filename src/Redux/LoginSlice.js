import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const userName = localStorage.getItem("user");
const loginStatus = localStorage.getItem("login");
const userToken = localStorage.getItem("token");

export const login = createAsyncThunk("login-action", async (obj) => {
  const response = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDATRd-Fo-vw7d-UB3fLL8gVd2drg3Ljn0",
    {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
});

export const signup = createAsyncThunk("signup-action", async (obj) => {
  const response = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDATRd-Fo-vw7d-UB3fLL8gVd2drg3Ljn0",
    {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
});

const LoginSlice = createSlice({
  name: "login-slice",
  initialState: {
    user: null,
    login: false,
    error: null,
    token: null,
  },
  reducers: {
    initialRender: (state, action) => {
      if (loginStatus === "true") {
        return {
          user: userName,
          login: true,
          error: null,
          token: userToken,
        };
      }
    },
    logout: (state, action) => {
      localStorage.setItem("user", null);
      localStorage.setItem("token", null);
      localStorage.setItem("login", null);
      return {
        user: null,
        login: false,
        error: null,
        token: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.idToken) {
        localStorage.setItem("user", action.payload.email);
        localStorage.setItem("login", true);
        localStorage.setItem("token", action.payload.idToken);
        return {
          user: action.payload.email,
          login: true,
          error: null,
          token: action.payload.idToken,
        };
      }
      console.log("error", action.payload.error.message);
      return { ...state, error: action.payload.error.message };
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      if (action.payload.idToken) {
        localStorage.setItem("user", action.payload.email);
        localStorage.setItem("login", true);
        localStorage.setItem("token", action.payload.idToken);
        return {
          user: action.payload.email,
          login: true,
          token: action.payload.idToken,
          error: null,
        };
      }
      return {
        ...state,
        error: action.payload.error.message,
      };
    });
  },
});
export const { initialRender, logout } = LoginSlice.actions;
export default LoginSlice.reducer;
