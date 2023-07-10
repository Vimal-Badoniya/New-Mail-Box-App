import React, { useEffect, useState } from "react";
import "./Inbox.css";
import { useDispatch, useSelector } from "react-redux";
import { getInbox, mailRead, deleteMail , clearInbox} from "../Redux/EmailSlice";
import { PiChatTeardropDotsFill } from "react-icons/pi";
function Inbox() {
  const [fromData, setFromData] = useState("");
  const [contentData, setContentData] = useState("");
  const [isDisplay, setIsDisplay] = useState(false);
  let counter = 0;
  const dispatch = useDispatch();

  const inbox = useSelector((state) => {
    return state.email.inbox;
  });
  const status = useSelector((state) => {
    return state.login.login;
  });
  useEffect(() => {
    
     const interval =  setInterval(() => {
        if(status){
        dispatch(getInbox())};
      }, 3000);
      // dispatch(getInbox());
    

    return ()=>{clearInterval(interval)}
  }, [status]);
  const keysArray = Object.keys(inbox);
  keysArray.map((item) => {
    if (!inbox[item].readStatus) {
      counter += 1;
    }
  });
  //console.log(keysArray)
  const x = keysArray.length;
  const emailClickHandler = (data) => {
    if (!data.readStatus) {
      dispatch(mailRead(data));
    }
    //console.log(data);
    if (!isDisplay) {
      setIsDisplay(true);
      setFromData(data.mailFrom);
      setContentData(data.mailBody);
    } else {
      setIsDisplay(false);
    }
  };
  const deleteButtonHandler = async (obj) => {
    //console.log(obj);
    await dispatch(deleteMail(obj));
    alert('Deleted Successfully')
    await dispatch(clearInbox())
    await dispatch(getInbox());
    setIsDisplay(false)
    
  };

  return (
    <>
      <h5 className="counter"> {counter} Unread Emails</h5>
      <div>
        {x === 0 && <h2>Empty Inbox</h2>}
        { x > 0 && keysArray.map((item) => {
          //console.log('inbox is rendering')
          const emailObj = { ...inbox[item], id: item };
          return (
            <li
              key={item}
              className="email"
              onClick={(e) => {
                e.stopPropagation()
                emailClickHandler(emailObj);
              }}
            >
              {!inbox[item].readStatus && (
                <span>
                  <PiChatTeardropDotsFill />
                </span>
              )}
              <span className="part1">From : {inbox[item].mailFrom} </span>
              {"      "}
              Content : {inbox[item].mailBody}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  deleteButtonHandler(emailObj);
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </div>
      {isDisplay && (
        <div className="mailDetail">
          <header>
            <h3 className="h3text">From :</h3> {fromData}
          </header>
          <main>
            <h3 className="h3text">Content :</h3> {contentData}
          </main>
        </div>
      )}
    </>
  );
}
export default Inbox;
