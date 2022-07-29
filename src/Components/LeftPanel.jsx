import React from "react";
import { Link } from "react-router-dom";
import birdLogo from "../Images/twitter-fill.svg";

const LeftPanel = (props) => {
  const { currentUserName, logoutFn } = props;

  return (
    <div className="leftPanel" id="leftPanel">
      <div id="menu">
        {/* <i
          className="fab fa-twitter"
          style={{ fontSize: "40px", color: "white" }}
        ></i> */}
        <img src={birdLogo} alt="" />
        <div className="icons">
          <i className="ri-home-7-line"></i>
          {/* <span> Home </span> */}
        </div>
        <div className="icons">
          <i className="ri-hashtag"></i>
          {/* <span> Explore </span> */}
        </div>
        <div className="icons">
          <i className="ri-notification-4-line"></i>
          {/* <span> Notifications </span> */}
        </div>
        <div className="icons">
          <i className="ri-mail-line"></i>
          {/* <span> Messages </span> */}
        </div>
        <div className="icons">
          <i className="ri-user-3-line"></i>
          {/* <span> Profile </span> */}
        </div>
        <div className="icons">
          <i className="ri-more-fill"></i>
          {/* <span> Profile </span> */}
        </div>
        <button className="loginButton"> Tweet </button>
      </div>
      <div className="logout">
        <p>
          <span>@{currentUserName} </span>
        </p>
        <button onClick={logoutFn}>Logout</button>
      </div>
    </div>
  );
};

export default LeftPanel;
