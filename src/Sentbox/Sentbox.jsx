import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSentbox } from "../Redux/EmailSlice";
import "./Sentbox.css";

const Sentbox = () => {
  const dispatch = useDispatch();
  const sentbox = useSelector((state) => {
    return state.email.sentbox;
  });
  const status = useSelector((state) => {
    return state.login.login;
  });
  useEffect(() => {
    if (status) {
      dispatch(getSentbox());
    }
  }, [status]);
  const keysArray = Object.keys(sentbox);
  const x = keysArray.length;

  return (
    <div>
      {x === 0 && <h2>Empty Sentbox</h2>}
      {keysArray.map((item) => {
        const emailObj = sentbox[item];
        return (
          <li key={item} className="email">
            <span className="part1">To : {sentbox[item].mailTo} </span>{" "}
            Content : {sentbox[item].mailBody}
          </li>
        );
      })}
    </div>
  );
};

export default Sentbox;
