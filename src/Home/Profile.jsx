import React, { useState } from "react";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/LoginSlice";
import Inbox from "../Inbox/Inbox";
import { clearProfile } from "../Redux/EmailSlice";
import Sentbox from "../Sentbox/Sentbox";
import Compose from "../Compose/Compose";
import Icon from '../images/icon.gif';
import { FaUserSecret } from 'react-icons/fa';


function Profile() {
  const [showInbox, setShowInbox] = useState(true);
  const [showSentbox, setShowSentbox] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const userName = useSelector((state) => {
    return state.login.user;
  });
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearProfile());
  };
  return (
    <div className="profile-container">
      <header className="profileHeader">
        <h1 className="name"> <img src={Icon} alt="icon" className="icon"/>The Mail Box App  </h1>
        <div className="user">
          <h3 className="me" style={{margin : '5px'}}>Welcome<FaUserSecret/> : {userName} </h3>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      </header>
      <nav className="menubar">
        <button
          onClick={() => {
            setShowCompose(true);
            setShowInbox(false);
            setShowSentbox(false);
          }}
        >
          Compose
        </button>
        <button
          onClick={() => {
            setShowInbox(true);
            setShowCompose(false);
            setShowSentbox(false);
          }}
        >
          Inbox {}
        </button>
        <button
          onClick={() => {
            setShowSentbox(true);
            setShowCompose(false);
            setShowInbox(false);
          }}
        >
          Sent
        </button>
      </nav>
      <main className="mainarea">
        {showInbox && <Inbox />}
        {showCompose && <Compose />}
        {showSentbox && <Sentbox />}
      </main>
    </div>
  );
}

export default Profile;
