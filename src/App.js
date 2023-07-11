import { useDispatch, useSelector } from "react-redux";
import Login from "./Authentication/Login";
import Profile from "./Home/Profile";
import { useEffect } from "react";
import { initialRender } from "./Redux/LoginSlice";

function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => {
    return state.login.login;
  });

  useEffect(() => {
    dispatch(initialRender());
  }, []);

  return (
    <div>
      {status && <Profile />}
      {!status && <Login />}
    </div>
  );
}

export default App;
