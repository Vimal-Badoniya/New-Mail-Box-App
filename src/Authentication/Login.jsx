import React, { useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/LoginSlice";
import { signup } from "../Redux/LoginSlice";
import Icon from "../images/icon.gif";

function Login() {
  const dispatch = useDispatch();
  const errorStatus = useSelector((state) => {
    return state.login.error;
  });
  const [loginForm, setLoginForm] = useState(true);
  const [enteredEmail, setEnteredEmail] = useState(null);
  const [enteredPassword, setEnteredPassword] = useState(null);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  let buttonHandler;
  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
    if (e.target.value.includes("@" && ".")) {
      return setEmailValid(true);
    }
    return setEmailValid(false);
  };
  const passwordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
    if (e.target.value.length > 6) {
      return setPasswordValid(true);
    }
    return setPasswordValid(false);
  };
  const loginSubmitHandler = (e) => {
    const obj = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };
    e.preventDefault();
    dispatch(login(obj));
  };
  const signupSubmitHandler = (e) => {
    e.preventDefault();
    const obj = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };
    dispatch(signup(obj));
  };
  if (isEmailValid && isPasswordValid) {
    buttonHandler = false;
  } else {
    buttonHandler = true;
  }
  return (
    <div>
      <div>
        <header></header>
        <header className="loginHeader">
          <h1 className="name">
            {" "}
            <img src={Icon} alt="icon" className="icon" />
            The Mail Box App{" "}
          </h1>
          <div className="use">
            <button
            className="loginButton1"
              onClick={() => {
                setLoginForm(true);
              }}
            >
              Login
            </button>
            <button
            className="loginButton1"
              onClick={() => {
                setLoginForm(false);
              }}
            >
              Signup
            </button>
          </div>
        </header>
      </div>
      <div className="container">
        <form className="loginForm">
          {loginForm && (
            <h2 className="loginH2">Welcome Back ! Please Login</h2>
          )}
          {!loginForm && <h2 className="loginH2">Create A New Account </h2>}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="vimal@gmail.com"
            onChange={emailChangeHandler}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="123456789"
            onChange={passwordChangeHandler}
            required
          />
          {errorStatus && <h2>{errorStatus}</h2>}
          {loginForm && (
            <button
              type="submit"
              onClick={loginSubmitHandler}
              disabled={buttonHandler}
              className="loginButton"
            >
              Login
            </button>
          )}
          {!loginForm && (
            <button
              type="submit"
              onClick={signupSubmitHandler}
              disabled={buttonHandler}
              className="loginButton"
            >
              Signup
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
