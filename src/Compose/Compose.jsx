import React, { useRef } from "react";
import "./Compose.css";
import { useDispatch, useSelector } from "react-redux";
import { sendMail, updateSentbox } from "../Redux/EmailSlice";

const Compose = () => {
  const dispatch = useDispatch();
  const userID = useSelector((state) => {
    return state.login.user;
  });

  const sendTo = useRef();
  const msg = useRef();
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const mailData = {
      mailFrom: userID,
      mailTo: sendTo.current.value,
      mailBody: msg.current.value,
      readStatus: false,
    };
    await dispatch(sendMail(mailData));
    await dispatch(updateSentbox(mailData));
    alert("Email Sent Successfully");
  };
  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <label htmlFor="user" className="to">
          To : {"   "}
        </label>
        <input type="email" ref={sendTo} className="compose-input" placeholder="example@email.com" required />

        <label htmlFor="user" className="to">
          Subject : {"   "}
        </label>
        <input type="text"  className="compose-input" placeholder="Subject (Optional)" />
        <textarea
        placeholder="Write your email here.."
          className="mailBody"
          name="body"
          id="body"
          ref={msg}
          required
        ></textarea>
        <div>
          <button type="button">Cancel</button>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default Compose;
