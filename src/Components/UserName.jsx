import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { SocialMediaAppContext } from "../Helpers/Contexts";

const UserName = (props) => {
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

  const { isValidUserName, mode } = props;

  const validateUserName = () => {
    isValidUserName(true);
  };

  return (
    <>
      <div className="userPage">
        <input
          type="text"
          placeholder="Name"
          onChange={(event) => setCurrentUserName(event.target.value)}
        />
        <button className="loginButton" onClick={() => validateUserName()}>
          Next
        </button>
      </div>
      {mode === "login" ? (
        <div>
          <p className="pageSwitch">
            New User? &nbsp;
            <Link to="/signup">
              <span
                className="registerRedir"
                onClick={() => setAppState("register")}
              >
                SignUp
              </span>
            </Link>
          </p>
        </div>
      ) : (
        <div>
          <p className="pageSwitch">
            Already a User? &nbsp;
            <Link to="/login">
              <span
                className="registerRedir"
                onClick={() => setAppState("login")}
              >
                Login
              </span>
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default UserName;
