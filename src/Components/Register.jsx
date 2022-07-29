import React, { useState, useContext, useEffect } from "react";
import { SocialMediaAppContext } from "../Helpers/Contexts";
import UserName from "./UserName.jsx";
import Password from "./Password.jsx";
import {
  getLocalStorageData,
  storeInLocalStorage,
} from "../Helpers/LocalStorageUtility";
import birdLogo from "../Images/twitter-fill.svg";
import { Link } from "react-router-dom";

const Register = () => {
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
  const [userNameDuplicate, setUserNameDuplicate] = useState(false);

  function isValidUserName(valid) {
    let success = "false";
    const alphanumeric = /^[\p{sc=Latn}\p{Nd}]*$/u;

    if (alphanumeric.test(currentUserName)) {
      valid = true;
      setUserNameValid(true);
    } else {
      valid = false;
      setUserNameValid(false);
    }

    usersList.forEach((user) => {
      if (user.username === currentUserName) {
        valid = false;
        setUserNameValid(false);
        setUserNameDuplicate(true);
      }
    });

    if (valid) {
      setUserNameValidated(true);
    }
  }

  function isValidPassword(valid) {
    const strongPassword = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))/;

    if (strongPassword.test(currentPasswd)) {
      valid = true;
      setPasswordValid(true);
    } else {
      valid = false;
      setPasswordValid(false);
    }

    if (valid) {
      const newUser = { username: currentUserName, password: currentPasswd };

      if (usersList !== null) {
        setUsersList([...usersList, newUser]);
        setAppState("login");
      } else {
        setUsersList([newUser]);
        setAppState("login");
      }
    }
  }

  useEffect(() => {
    storeInLocalStorage("allUsers", usersList);
  }, [usersList]);

  return (
    <>
      {/* <div className="register">
        <h1> New User Registration </h1>
        {!userNameValidated ? (
          <UserName isValidUserName={isValidUserName} />
        ) : null}

        {userNameValidated ? (
          <Password isValidPassword={isValidPassword} mode="register" />
        ) : null}

        {!userNameValid && !userNameDuplicate ? (
          <p className="invalid">
            User Name Invalid ! Only Alphanumeric allowed...
          </p>
        ) : null}
        {userNameDuplicate ? (
          <p className="invalid"> User Name already exists ! </p>
        ) : null}

        {!passwordValid ? (
          <div className="invalid">
            <p> Password Weak ...! </p>
            <p>1. Include one lowercase letter </p>
            <p>2. one uppercase letter </p>
            <p>3. one digit </p>
            <p>4. total 6 chars long </p>
          </div>
        ) : null}

        <p>
          New User? &nbsp;
          <Link to="/login">
            <span className="registerRedir">SignUp</span>
          </Link>
        </p>
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
              See what’s happening in <br /> the world right now
            </h5>
            <p>SignUp to Bird App</p>
            <form>
              {!userNameValidated ? (
                <UserName isValidUserName={isValidUserName} />
              ) : null}

              {userNameValidated ? (
                <Password isValidPassword={isValidPassword} mode="register" />
              ) : null}

              {!userNameValid && !userNameDuplicate ? (
                <p className="invalid">
                  User Name Invalid ! Only Alphanumeric allowed...
                </p>
              ) : null}

              {userNameDuplicate ? (
                <p className="invalid"> User Name already exists ! </p>
              ) : null}

              {!passwordValid ? (
                <div className="invalid">
                  <p> Weak Password </p>
                  <p>1. Include one lowercase </p>
                  <p>2. Include one uppercase </p>
                  <p>3. Include one Numeric </p>
                  <p>4. Minimum 6 Characters </p>
                </div>
              ) : null}

              {/* <p className="pageSwitch">
                Already a User? &nbsp;
                <Link to="/login">
                  <span className="registerRedir">Login</span>
                </Link>
              </p> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
