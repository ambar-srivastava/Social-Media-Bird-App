import React, { useContext } from "react";
import { SocialMediaAppContext } from "../Helpers/Contexts";

const Password = (props) => {
  const {
    appState,
    setAppState,
    usersList,
    setUsersList,
    currentUserName,
    setCurrentUserName,
    currentPasswd,
    setCurrentPasswd,
  } = useContext(SocialMediaAppContext);

  const { isValidPassword, mode } = props;

  function validatePassword(event) {
    event.preventDefault();
    isValidPassword(true);
  }

  return (
    <div className="userPage">
      <input
        type="password"
        placeholder="Password"
        onChange={(event) => setCurrentPasswd(event.target.value)}
      />
      <button className="loginButton" onClick={() => validatePassword(event)}>
        {mode === "register" ? "Register" : "Login"}
      </button>
    </div>
  );
};

export default Password;
