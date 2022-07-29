import React, { useState, useContext } from "react";
import { SocialMediaAppContext } from "../Helpers/Contexts";
import UserName from "./UserName.jsx";
import Password from "./Password.jsx";
import {
  getLocalStorageData,
  storeInLocalStorage,
} from "../Helpers/LocalStorageUtility";
import birdLogo from "../Images/twitter-fill.svg";

const Login = () => {
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

  const [userNameValidated, setUserNameValidated] = useState(false);
  const [userNameValid, setUserNameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  function isValidUserName(valid) {
    let validUser = false;

    if (usersList !== null) {
      usersList.forEach((user) => {
        if (user.username === currentUserName) {
          validUser = true;
          setUserNameValid(true);
        }
      });
    }

    if (validUser) {
      setUserNameValidated(true);
    } else {
      setUserNameValid(false);
    }
  }

  function isValidPassword(valid) {
    let validPassword = false;

    if (usersList !== null) {
      usersList.forEach((user, index) => {
        if (
          user.username === currentUserName &&
          user.password === currentPasswd
        ) {
          validPassword = true;
          setPasswordValid(true);
        }
      });
    }

    if (validPassword) {
      const NewUser = { username: currentUserName, password: currentPasswd };
      setAppState("dashboard");
      storeInLocalStorage("loggedin", currentUserName);
    } else {
      setPasswordValid(false);
    }
  }

  return (
    <>
      {/* <div className="login">
        <h1> Login </h1>
        {!userNameValidated ? (
          <UserName isValidUserName={isValidUserName} mode="login" />
        ) : null}

        {userNameValidated ? (
          <Password isValidPassword={isValidPassword} />
        ) : null}
        {!userNameValid ? <p className="invalid"> Invalid User... </p> : null}
        {!passwordValid ? (
          <p className="invalid"> Invalid Password... </p>
        ) : null}
      </div> */}

      <div id="bg">
        <div id="left">
          <div id="ovrlay">
            <div id="midovr">
              <div class="icons">
                <i class="ri-search-line"></i>
                <h5>Follow your interests</h5>
              </div>
              <div class="icons">
                <i class="ri-user-fill"></i>
                <h5>Hear what people are talking about.</h5>
              </div>
              <div class="icons">
                <i class="ri-chat-1-line"></i>
                <h5>Join the conversation.</h5>
              </div>
            </div>
          </div>
        </div>
        <div id="right">
          <div id="panel">
            <img src={birdLogo} alt="" />
            <h5>
              See what’s happening in <br />
              the world right now
            </h5>
            <p>Login to Bird App</p>
            <form>
              {!userNameValidated ? (
                <UserName isValidUserName={isValidUserName} mode="login" />
              ) : null}
              {userNameValidated ? (
                <Password isValidPassword={isValidPassword} />
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
